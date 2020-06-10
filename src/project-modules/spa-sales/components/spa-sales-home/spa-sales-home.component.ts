import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';

@Component({
  selector: 'spa-sales-home',
  templateUrl: './spa-sales-home.component.html',
  styleUrls: ['./spa-sales-home.component.css']
})
export class SpaSalesHomeComponent implements OnInit{
  
  constructor(private appService: AppService){}



ngOnInit() {
  this.appService.updateCurrentModule('spa-sales');
  }
}