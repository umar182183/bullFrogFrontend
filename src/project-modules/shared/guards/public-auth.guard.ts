import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router, CanActivate } from "@angular/router";
@Injectable()
export class PublicAuthGuard implements CanActivate {

    // public account_id: any;
    // public header_data: any;
    // constructor(private headerService: HeaderService, private router: Router) {
        
    // }
    canActivate(): boolean | Observable<boolean> {

        // let base_url = environment.baseHeaderUrl + `/angular_header_api/`;
        // return this.headerService.getHeaderData(base_url).pipe(map(res => {
        //     if (res) {
        //         this.header_data = res
        //         this.account_id = this.header_data.user_current_account.roles.role_id;
        //         if (this.account_id == 100) {
        //             return true
        //         } else {
        //             this.router.navigate(['/page-not-found']);
        //             return false
        //         }
        //     }
        // }))
        return true
    }

}
