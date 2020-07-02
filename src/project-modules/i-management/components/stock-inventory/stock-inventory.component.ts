import { Component, OnInit, ViewChild, AfterContentInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { StockInventoryService } from '../../services/stock-inventory.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'stock-inventory',
  templateUrl: './stock-inventory.component.html',
  styleUrls: ['./stock-inventory.component.css']
})
export class StockInventoryComponent implements OnInit, OnDestroy {

  public isLocation: boolean = false;
  public unsub: Subscription;
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
    
   this.unsub = this.stockService.currentComponent$.subscribe(currentComonent => {
      
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
  
  let backdrop = document.getElementsByClassName("modal-backdrop");
  if (backdrop.length > 1) {
    for (let index = 0; index < backdrop.length; index++) {
      backdrop[index].remove();
    }
  }
}

ngOnDestroy(){
  this.unsub.unsubscribe();
}

}