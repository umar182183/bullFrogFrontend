import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';

@Component({
  selector: 'campaigns-home',
  templateUrl: './campaigns-home.component.html',
  styleUrls: ['./campaigns-home.component.css']
})
export class CampaignsHomeComponent implements OnInit {
  
constructor(private appService: AppService){}



ngOnInit() {
  this.appService.updateCurrentModule('campaigns');
  }
}