import { Component, OnInit, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'stock-inventory',
  templateUrl: './stock-inventory.component.html',
  styleUrls: ['./stock-inventory.component.css']
})
export class StockInventoryComponent implements OnInit, AfterViewInit {

  public isLocation: boolean = false;
  @ViewChild('openPopup', { static: false }) openPopup: ModalDirective;
  @ViewChild('qtyModal', { static: false }) qtyModal: ModalDirective;
  @ViewChild('cnfrmtnModal', { static: false }) cnfrmtnModal: ModalDirective;

  public isAnotherLocation: boolean= false;
  
  constructor(private appService: AppService){}
  ngAfterViewInit() {
    this.openPopup.show();
  } 
  
  ngOnInit() {
    this.appService.updateCurrentModule('restock');
    }

  getLocationScreen(){
    this.isLocation = true;
  }

}