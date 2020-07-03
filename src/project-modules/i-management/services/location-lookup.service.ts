import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LocationLookupService {

  constructor(private http: HttpClient) {

  }

getLocationdata()
{
 return this.http.get('http://10.0.3.40/AspCoreApiIIS/api/InventoryManagement/GetPartNumber?partNumber=65-1422');
}

}
