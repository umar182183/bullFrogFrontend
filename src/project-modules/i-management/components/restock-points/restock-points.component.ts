import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';
import { RestockService } from '../../services/restock.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { RestockModel } from '../../models/restock.model';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'restock-points',
  templateUrl: './restock-points.component.html',
  styleUrls: ['./restock-points.component.css']
})
export class RestockPointsComponent implements OnInit {
  
  
  
  public tableArr:RestockModel[] = [];
  public partArr:any[] = [];
  public ordersArr:any[] = [];
  public partNumber;
  public otherQty: number;
  public isOther: boolean = false;
  public loading = false;
  public Buttonloading = false;
  public popTableloading = false;
  public isLoaded = false;
  public loader = false;
  dataSource = new MatTableDataSource<RestockModel>(this.tableArr);
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild('openPopup', { static: false }) openPopup: ModalDirective;


  displayedColumns: string[] = ['partNo', 'description', 'location', 'partCurrentQty'];

  constructor(private appService: AppService, private restockService: RestockService){

  }
 
ngOnInit() {
    this.appService.updateCurrentModule('restock');
    this.loadTabledata();
    this.dataSource;
    this.tableArr

}

getRestockFormData(event)
{
this.otherQty = +event;
}

sendRestockPart(otherQtyText, otherQtyCheck)
{
  this.Buttonloading = true;
  let logId: number = this.partArr[0].id;
  let obj = {
    logId: logId,
    otherQty: this.otherQty,
  };
  this.restockService.postRstockPart(obj).subscribe((data: any) => {
    // this.ordersArr = [];
    this.isLoaded = true;
    this.loadTabledata();
    otherQtyCheck.checked = false;
    otherQtyText.value = '';
  })
}

getOtherCheck(event)
{
  if (event == true) {
    this.isOther = true;
  } else {
    this.isOther = false;
  }
}

applyFilter(filterValue: string) {
  filterValue = filterValue.trim();
  filterValue = filterValue.toLowerCase();
  this.dataSource.filter = filterValue;
}

loadTabledata()
{
  this.loader = true;
  this.loading = false;
  this.restockService.getTabledata().subscribe((data:any) => {
    this.loader = false;
    this.loading = true;
    this.tableArr = data.responseData.restockOpen.map((a) => {
      return {
        'partNo': a.partNo,
        'description': a.description,
        'location': a.location,
        'partCurrentQty': a.partCurrentQty,
        'id': a.id
      }
    });
    this.dataSource = new MatTableDataSource<RestockModel>(this.tableArr);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.isLoaded == true) {
      this.openPopup.hide();
    this.isLoaded = false;
    this.Buttonloading = false;
    }
    
  })
}

loadRestockPopup(partNum){
  this.getPartData(partNum)
  this.openPopup.show()
}

private getPartData(partNum)
{
  this.partNumber = partNum;
  
   this.partArr = this.tableArr.filter(p =>
    {
      return p.partNo == partNum;
    });
    this.ordersArr = [];
    this.popTableloading = true;
    this.restockService.getAllpendingOrders(partNum).subscribe((data:any) =>
    {
      this.ordersArr = data.responseData.pendingReordersLogs;
      this.popTableloading = false;
    })

}

}




