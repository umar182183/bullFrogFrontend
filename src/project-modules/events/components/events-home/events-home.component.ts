import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';

@Component({
  selector: 'events-home',
  templateUrl: './events-home.component.html',
  styleUrls: ['./events-home.component.css']
})
export class EventsHomeComponent implements OnInit {
  
  
    constructor(private appService: AppService){}
  
  
  
  ngOnInit() {
    this.appService.updateCurrentModule('events');
    }
}