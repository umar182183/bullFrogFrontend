import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class AuthService{


    constructor(private http: HttpClient){}
    

login(userName: any, password: any)
{
    if (userName == "umar" && password == "password") {
        return true;
    } else {
        return false;
    }
}
}