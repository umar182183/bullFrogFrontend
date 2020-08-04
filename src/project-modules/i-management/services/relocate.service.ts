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

  getPartNumber(partNum)
  {
   return this.http.get(this.URL+"InventoryManagement/GetPartNumber?partNumber="+partNum+"&locationId=0");
  }

  getLocationById(locationId, partNum)
  {
    debugger
    let obj = {
      locationId:locationId,
      partNumber: partNum
    }
   return this.http.post(this.URL+"InventoryManagement/GetLocationById?locationId="+locationId+"&partNumber="+partNum, obj);
  }

  assignLocation(obj)
  {
   return this.http.post(this.URL+"InventoryManagement/AssignLocation?partNumber="+obj.partnumber
            +"&sreen="+obj.sreen+"&qty="+obj.qty+"&locationId="+obj.locationId+"&returnUrl="
            +JSON.stringify(obj.returnUrl)+"&onlyforBluffdate="+obj.onlyforBluffdate, obj);
  }

}
