import { Component, OnInit, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { StockInventoryService } from '../../services/stock-inventory.service';


@Component({
  selector: 'stock-inventory',
  templateUrl: './stock-inventory.component.html',
  styleUrls: ['./stock-inventory.component.css']
})
export class StockInventoryComponent implements OnInit {

  public isLocation: boolean = false;

  @ViewChild('openPopup', { static: false }) openPopup: ModalDirective;
  @ViewChild('qtyModal', { static: false }) qtyModal: ModalDirective;
  @ViewChild('cnfrmtnModal', { static: false }) cnfrmtnModal: ModalDirective;

  public isAnotherLocation: boolean= false;
  
  constructor(private appService: AppService, private stockService: StockInventoryService){
    
  }


  
  ngOnInit() {
    this.appService.updateCurrentModule('restock');
    this.getClickCall();
    }

  getLocationScreen(){
    this.isLocation = true;
  }

  getClickCall()
  {
    this.stockService.currentComponent$.subscribe(currentComonent => {
      if (currentComonent == 'stock-inventory') {
        this.qtyModal.hide();
        this.cnfrmtnModal.hide();
        this.isLocation = false;
        this.openPopup.show();
      }
    });
  
  }

  removeModalClass()
{
  let element = document.getElementsByClassName("modal-backdrop");
  element[0].remove();

}

}