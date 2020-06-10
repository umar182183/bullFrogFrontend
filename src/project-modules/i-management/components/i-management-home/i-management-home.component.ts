import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';

@Component({
  selector: 'i-management-home',
  templateUrl: './i-management-home.component.html',
  styleUrls: ['./i-management-home.component.css']
})
export class InventoryManagementHomeComponent implements OnInit {
  
  
    constructor(private appService: AppService){}
  
  
  
  ngOnInit() {
    this.appService.updateCurrentModule('i-management');
    }
}