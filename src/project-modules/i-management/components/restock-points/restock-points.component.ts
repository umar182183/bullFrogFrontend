import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';
import { RestockService } from '../../services/restock.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { RestockModel } from '../../models/restock.model';

@Component({
  selector: 'restock-points',
  templateUrl: './restock-points.component.html',
  styleUrls: ['./restock-points.component.css']
})
export class RestockPointsComponent implements OnInit {
  
  
  
  public tableArr:RestockModel[] = [];
  public loading = false;
  public loader = false;
  dataSource = new MatTableDataSource<RestockModel>(this.tableArr);
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  displayedColumns: string[] = ['partNo', 'description', 'location', 'partCurrentQty'];

  constructor(private appService: AppService, private restockService: RestockService){

  }
 
ngOnInit() {
    this.appService.updateCurrentModule('restock');
    this.loadTabledata();
    this.dataSource;
    this.tableArr

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
        'partCurrentQty': a.partCurrentQty
      }
    });
    this.dataSource = new MatTableDataSource<RestockModel>(this.tableArr);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  })
}


}




