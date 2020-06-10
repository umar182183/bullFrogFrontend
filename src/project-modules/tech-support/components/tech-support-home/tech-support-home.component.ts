import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';

@Component({
  selector: 'tech-support-home',
  templateUrl: './tech-support-home.component.html',
  styleUrls: ['./tech-support-home.component.css']
})
export class TechSupportHomeComponent implements OnInit {
  
constructor(private appService: AppService){}



ngOnInit() {
  this.appService.updateCurrentModule('tech-support');
  }
}