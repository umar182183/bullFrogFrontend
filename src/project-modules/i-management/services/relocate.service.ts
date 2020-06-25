import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RelocateService {

  constructor(private http: HttpClient) {

  }

}
