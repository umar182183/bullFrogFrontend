import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';
// import App service here

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

 
public currentModule: string = '';

constructor(private router: Router, private appService: AppService){
  this.appService.currentModule$.subscribe(currentModule => {
    this.currentModule = currentModule;
    
  });
  
}

ngOnInit(){
  
}
}
