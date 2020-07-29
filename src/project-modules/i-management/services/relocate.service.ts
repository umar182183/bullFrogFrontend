import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RelocateService {

  constructor(private http: HttpClient) {
  }

  public URL = environment.apiBaseUrl;

  getPartsList()
  {
   return this.http.get(this.URL+"InventoryManagement/GetPartNumbersList");
  }
  
}
