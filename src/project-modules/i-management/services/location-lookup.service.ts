import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationLookupService {


  public URL = environment.apiBaseUrl;


  constructor(private http: HttpClient) {
  }

getLocationdata(partNum)
{
 return this.http.get(this.URL+"InventoryManagement/GetPartNumber?partNumber="+partNum);
}

getPartsList()
{
 return this.http.get(this.URL+"InventoryManagement/GetPartNumbersList");
}

getImgUrl(partNum): Observable<Blob>
{
 return this.http.get(this.URL+"InventoryManagement/GetPartPicture?partNumber="+partNum, { responseType: 'blob' })
 
}
}
