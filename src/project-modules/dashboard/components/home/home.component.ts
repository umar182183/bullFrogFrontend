import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';
// import App service here

@Component({
  selector: 'dashboard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  
  constructor(private appService: AppService){}



ngOnInit() {
  this.appService.updateCurrentModule('dashboard');
  }
  
}