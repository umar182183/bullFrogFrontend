import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

public currentModule: string = '';

constructor(private appService: AppService){
  this.appService.currentModule$.subscribe(currentModule => {
    this.currentModule = currentModule;
  });
  
}

ngOnInit(){
  
}
}
