import { Component, Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AppService } from '../../services/app.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  model: any = {};

  constructor(private router: Router, private appService: AppService){}

  ngOnInit() {

    }

  login()
  {

    this.router.navigate(['/dashboard/home']);

  }
}


