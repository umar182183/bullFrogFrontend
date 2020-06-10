import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';

@Component({
  selector: 'restock-points',
  templateUrl: './restock-points.component.html',
  styleUrls: ['./restock-points.component.css']
})
export class RestockPointsComponent implements OnInit {
  
  constructor(private appService: AppService){}
  
  
  
  ngOnInit() {
    this.appService.updateCurrentModule('restock');
    }
}