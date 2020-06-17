import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';

@Component({
  selector: 'reorder-points',
  templateUrl: './reorder-points.component.html',
  styleUrls: ['./reorder-points.component.css']
})
export class ReorderPointsComponent implements OnInit {
  
  constructor(private appService: AppService){}
  
  public IsClosedCurrent: boolean = false;
  public isReview: boolean = false;
  public isPurchasePending: boolean = false;
  public isOpenPO: boolean = false;
  public isPutAway: boolean = false;
  
  ngOnInit() {
    this.appService.updateCurrentModule('restock');
    }
}