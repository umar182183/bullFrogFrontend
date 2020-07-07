import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';
import { RestockService } from '../../services/restock.service';

@Component({
  selector: 'restock-points',
  templateUrl: './restock-points.component.html',
  styleUrls: ['./restock-points.component.css']
})
export class RestockPointsComponent implements OnInit {
  
  constructor(private appService: AppService, private restockService: RestockService){}
  
  public tableArr:any[] = [];
  public loading = false;
  public loader = false;
  
ngOnInit() {
    this.appService.updateCurrentModule('restock');
    this.loadTabledata();
}

loadTabledata()
{
  this.loader = true;
  this.loading = true;
  this.restockService.getTabledata().subscribe((data:any) => {
   this.tableArr = data.responseData.restockOpen;
   this.loader = false;
  this.loading = false;
  })
}
}