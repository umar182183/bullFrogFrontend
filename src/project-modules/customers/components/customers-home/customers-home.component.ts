import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';

@Component({
  selector: 'customers-home',
  templateUrl: './customers-home.component.html',
  styleUrls: ['./customers-home.component.css']
})
export class CustomersHomeComponent implements OnInit {
  
constructor(private appService: AppService){}



ngOnInit() {
    this.appService.updateCurrentModule('customers');
    }
}