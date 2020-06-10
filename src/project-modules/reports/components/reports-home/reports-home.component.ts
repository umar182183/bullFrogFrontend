import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';

@Component({
  selector: 'reports-home',
  templateUrl: './reports-home.component.html',
  styleUrls: ['./reports-home.component.css']
})
export class ReportsHomeComponent implements OnInit {
  
constructor(private appService: AppService){}



ngOnInit() {
  this.appService.updateCurrentModule('reports');
  }
}