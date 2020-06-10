import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';

@Component({
  selector: 'i-management-header',
  templateUrl: './i-management-header.component.html',
  styleUrls: ['./i-management-header.component.css']
})
export class InventoryManagementHeaderComponent implements OnInit {
  
  
    constructor(private appService: AppService){}
  
  
  
  ngOnInit() {
    this.appService.updateCurrentModule('i-management');
    }
}