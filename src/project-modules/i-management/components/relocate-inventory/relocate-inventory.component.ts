import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { StockInventoryService } from '../../services/stock-inventory.service';

@Component({
  selector: 'relocate-inventory',
  templateUrl: './relocate-inventory.component.html',
  styleUrls: ['./relocate-inventory.component.css']
})
export class RelocateInventoryComponent implements OnInit, AfterViewInit {
  
  @ViewChild('openPopup', { static: false }) openPopup: ModalDirective;
  @ViewChild('locationModal', { static: false }) locationModal: ModalDirective;
  @ViewChild('qtyModal', { static: false }) qtyModal: ModalDirective;

  public result: boolean = false;
  
  constructor(private appService: AppService, private stockService: StockInventoryService){}

ngAfterViewInit(){
  this.openPopup.show();
}
  
  
ngOnInit() {
    this.appService.updateCurrentModule('restock');
    this.getClickCall();
}

getResult()
{
  this.result = true;
  this.qtyModal.hide();
}


getClickCall()
{
  this.stockService.currentComponent$.subscribe(currentComonent => {
    if (currentComonent == 'relocate-inventory') {
      this.locationModal.hide();
      this.qtyModal.hide();
      this.openPopup.show();
    }
  });

}


}