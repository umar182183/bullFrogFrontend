import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
// import App service here

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

@ViewChild('cnfrmtnModal', { static: false }) logoutModal: ModalDirective;

public currentModule: string = '';

constructor(private router: Router, private appService: AppService){
  this.appService.currentModule$.subscribe(currentModule => {
    this.currentModule = currentModule;
    
  });
  
}

ngOnInit(){
  
}

removeModalClass()
{
  
  let backdrop = document.getElementsByClassName("modal-backdrop");
  if (backdrop.length > 1) {
    for (let index = 0; index < backdrop.length; index++) {
      backdrop[index].remove();
    }
  }
}

}
