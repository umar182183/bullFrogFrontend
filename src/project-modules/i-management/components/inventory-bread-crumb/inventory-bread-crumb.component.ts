import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';

@Component({
  selector: 'inventory-bread-crumb',
  templateUrl: './inventory-bread-crumb.component.html',
  styleUrls: ['./inventory-bread-crumb.component.css']
})
export class InventoryBreadCrumbComponent implements OnInit {
  
  public breadCrumb:boolean = true;

  constructor(private appService: AppService){}
  
  resetClass()
  {
  
    this.appService.updateCurrentModule('breadcrumb');
    this.breadCrumb = false;
  }

  goToDashboard()
  {
  this.appService.updateCurrentModule('restock');
  this.breadCrumb = false;
  }
  
  ngOnInit() {
   
    }
}