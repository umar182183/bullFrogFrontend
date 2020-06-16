import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

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

  
constructor(private appService: AppService){}

ngAfterViewInit(){
  this.openPopup.show();
}
  
  
  
ngOnInit() {
    this.appService.updateCurrentModule('restock');
  }
}