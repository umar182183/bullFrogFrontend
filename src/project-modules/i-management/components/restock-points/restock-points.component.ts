import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';
import { RestockService } from '../../services/restock.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { RestockModel } from '../../models/restock.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'restock-points',
  templateUrl: './restock-points.component.html',
  styleUrls: ['./restock-points.component.css']
})
export class RestockPointsComponent implements OnInit {
  
  
  
  public tableArr:RestockModel[] = [];
  public partArr:any[] = [];
  public partNumDataArr:any[] = [];
  public sendArrToRestock:any[] = [];
  public ordersArr:any[] = [];
  public partNumber;
  public otherQty: number = 0;
  public TotalQty: number=0;
  public qtyInLocation: number=0;
  public isOther: boolean = false;
  public loading = false;
  public Buttonloading = false;
  public popTableloading = false;
  public isLoaded = false;
  public loader = true;
  dataSource = new MatTableDataSource<RestockModel>(this.tableArr);
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild('openPopup', { static: false }) openPopup: ModalDirective;
  public myControl = new FormControl();


  displayedColumns: string[] = ['partNo', 'description', 'location', 'partCurrentQty'];

  constructor(private appService: AppService, private restockService: RestockService,
    private toastr: ToastrService){

  }
 
ngOnInit() {
    this.appService.updateCurrentModule('restock');
    this.loadTabledata();
    this.dataSource;
}

getRestockFormData(event)
{
  debugger
  event == ""? event = 0: event = +event;
  this.TotalQty = this.TotalQty - this.otherQty;
  this.otherQty =  0;
  this.otherQty =  event;
  this.TotalQty = this.TotalQty + this.otherQty;
}

sendRestockPart(otherQtyText, otherQtyCheck)
{
  
  this.Buttonloading = true;
  let logId: number = this.partArr[0].id;
  let obj = {
    logId: logId,
    otherQty: this.otherQty || 0,
    val: this.sendArrToRestock
  };
  debugger
  
  this.loader = true;
  this.openPopup.hide();
  this.restockService.postRstockPart(obj).subscribe((data: any) => {
    // this.ordersArr = [];
    debugger
    if (data.success == false) {
    this.toastr.error(data.message);
    }
    else{
      this.toastr.success(data.message);
    }
    this.isLoaded = true;
    this.loadTabledata();
    otherQtyCheck.checked = false;
    otherQtyText.value = '';
    this.loader = false;
    this.loadTabledata();

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
    debugger
    this.loading = true;
    this.tableArr = data.responseData.restockOpen.map((a) => {
      return {
        'partNo': a.partNo,
        'description': a.description,
        'location': a.location,
        'partCurrentQty': a.partCurrentQty,
        'id': a.id,
        'locationId': a.locationId
      }
    });
    this.dataSource = new MatTableDataSource<RestockModel>(this.tableArr);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loader = false;
   
    if (this.isLoaded == true) {
      this.openPopup.hide();
    this.isLoaded = false;
    this.Buttonloading = false;
    }
    
  })
}

loadRestockPopup(partNum, locationId){
  this.getPartData(partNum);
  this.myControl.reset();
  debugger
  this.loadPartNumData(partNum, locationId);
  this.openPopup.show()
  this.TotalQty = 0;
}

private loadPartNumData(partnum, locationId)
{
  this.partNumDataArr = [];
  this.loader = true;

  this.restockService.getPartNumber(partnum, locationId).subscribe((data:any) => {
    debugger
    this.partNumDataArr = data.responseData.data;
    let result = this.partNumDataArr.map((el: any) => {
      var o = Object.assign({}, el);
      o.QtyInLocation = 0;
      o.NewQty = 0
      return o;
    });
    

  this.sendArrToRestock = result;
  for (let i=0; i < this.sendArrToRestock.length; i++) {
    this.sendArrToRestock[i].QtyInLocation = this.sendArrToRestock[i].qty;
  }
    this.loader = false;

  })
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
    this.loader = true;

    this.restockService.getAllpendingOrders(partNum).subscribe((data:any) =>
    {
      this.ordersArr = data.responseData.pendingReordersLogs;
      this.popTableloading = false;
    this.loader = false;
  

    })
}
getPulledQty(pulledQty, qty, currentLocation, elementId)
{
  
  pulledQty == ""? pulledQty = 0:  pulledQty = +pulledQty;
  qty = +qty;  
  
for (let i=0; i < this.sendArrToRestock.length; i++) {
  if (this.sendArrToRestock[i].location === currentLocation) {
       this.sendArrToRestock[i].NewQty = 0;
       this.sendArrToRestock[i].NewQty = pulledQty;
  }
}

this.TotalQty = 0;

if (pulledQty > qty) {
  debugger
    this.toastr.warning("Qty should not be greater than the Qty in Location!");
       let ele: any = document.getElementById(elementId);
       ele.value = "";
  }
  else{
    for (let i=0; i < this.sendArrToRestock.length; i++) {
      this.TotalQty = this.TotalQty + this.sendArrToRestock[i].NewQty;
    }
  }

}

}




