import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LocationLookupService {

  public URL = "http://10.0.3.40/AspCoreApiIIS/api/InventoryManagement/GetPartNumber?partNumber=";


  constructor(private http: HttpClient) {
  }

getLocationdata(partNum)
{
 return this.http.get(this.URL+partNum);
}

}
