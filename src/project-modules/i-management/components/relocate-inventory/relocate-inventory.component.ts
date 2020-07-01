import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { StockInventoryService } from '../../services/stock-inventory.service';

@Component({
  selector: 'relocate-inventory',
  templateUrl: './relocate-inventory.component.html',
  styleUrls: ['./relocate-inventory.component.css']
})
export class RelocateInventoryComponent implements OnInit {
  
  @ViewChild('openPopup', { static: false }) openPopup: ModalDirective;
  @ViewChild('locationModal', { static: false }) locationModal: ModalDirective;
  @ViewChild('qtyModal', { static: false }) qtyModal: ModalDirective;

  public result: boolean = false;
  
  constructor(private appService: AppService, private stockService: StockInventoryService){}

  
  
ngOnInit() {
    this.appService.updateCurrentModule('restock');
    this.getClickCall();
}

getResult()
{
  this.result = true;
  this.qtyModal.hide();
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


getClickCall()
{
  this.stockService.currentComponent$.subscribe(currentComonent => {
    if (currentComonent == 'relocate-inventory') {
    this.openPopup.hide();
      this.locationModal.hide();
      this.qtyModal.hide();
      this.result = false;
      this.openPopup.show();
    }
  });

}


}