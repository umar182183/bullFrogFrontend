import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { StockInventoryService } from '../../services/stock-inventory.service';

@Component({
  selector: 'inventory-counts',
  templateUrl: './inventory-counts.component.html',
  styleUrls: ['./inventory-counts.component.css']
})
export class InventoryCountsComponent implements OnInit, AfterViewInit {

@ViewChild('openPopup', { static: false }) openPopup: ModalDirective;
@ViewChild('modal2', { static: false }) modal2: ModalDirective;
@ViewChild('modal3', { static: false }) modal3: ModalDirective;
@ViewChild('modal4', { static: false }) modal4: ModalDirective;

  
constructor(private appService: AppService, private stockService: StockInventoryService){}

ngAfterViewInit(){
  this.openPopup.show();
  this.getClickCall();
}
  
  
  
ngOnInit() {
    this.appService.updateCurrentModule('restock');
}
getClickCall()
{
  this.stockService.currentComponent$.subscribe(currentComonent => {
    if (currentComonent == 'inventory-counts') {
      this.modal2.hide();
      this.modal3.hide();
      this.modal4.hide();
      this.openPopup.show();
      
    }
  });

}

}