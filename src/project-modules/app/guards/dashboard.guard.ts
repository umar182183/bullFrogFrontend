import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AppService } from '../services/app.service';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardGuard implements CanActivate {

    constructor(private appService: AppService){}

    canActivate(): boolean | Observable<boolean> {
    this.appService.updateCurrentModule('dashboard');
        return true
    }

}