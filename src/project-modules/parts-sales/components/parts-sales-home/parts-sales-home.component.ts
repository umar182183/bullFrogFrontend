import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';

@Component({
  selector: 'parts-sales-home',
  templateUrl: './parts-sales-home.component.html',
  styleUrls: ['./parts-sales-home.component.css']
})
export class PartsSalesHomeComponent implements OnInit {
  
  constructor(private appService: AppService){}
  
  
  
  ngOnInit() {
    this.appService.updateCurrentModule('parts-sale');
    }
}