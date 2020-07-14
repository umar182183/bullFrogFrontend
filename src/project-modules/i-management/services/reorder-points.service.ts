import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReorderPointsService {

  public URL = environment.apiBaseUrl;


  constructor(private http: HttpClient) {
  }

getReOrderData()
{
 return this.http.get(this.URL+"ReOrder/GetReOrderData");
}

}
