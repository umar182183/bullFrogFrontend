import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';

@Component({
  selector: 'inventory-counts',
  templateUrl: './inventory-counts.component.html',
  styleUrls: ['./inventory-counts.component.css']
})
export class InventoryCountsComponent implements OnInit {
  
  constructor(private appService: AppService){}
  
  
  
  ngOnInit() {
    this.appService.updateCurrentModule('restock');
    }
}