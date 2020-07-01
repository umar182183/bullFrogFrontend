import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';
import { StockInventoryService } from '../../services/stock-inventory.service';

@Component({
  selector: 'i-management-header',
  templateUrl: './i-management-header.component.html',
  styleUrls: ['./i-management-header.component.css']
})
export class InventoryManagementHeaderComponent implements OnInit {
  
  public currentComponent;
  
    constructor(private appService: AppService, private stockService: StockInventoryService){
      this.appService.currentModule$.subscribe(currentComponent => {
        
        this.currentComponent = currentComponent;
      });

     
    }
  
  checkBubbleClicked(event){
    this.stockService.updateCurrentComponent(event);
  }
  
  ngOnInit() {
    }
}