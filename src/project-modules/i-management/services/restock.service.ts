import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RestockModel } from '../models/restock.model';


@Injectable({
  providedIn: 'root'
})
export class RestockService {

  
  public URL = environment.apiBaseUrl;


  constructor(private http: HttpClient) {
  }

getTabledata(): Observable<RestockModel[]>
{
 return this.http.get<RestockModel[]>(this.URL+"ReOrder/GetRestock");
}

getAllpendingOrders(partNum)
{
 return this.http.get(this.URL+"ReOrder/GetAllPendingReorders?partNumber="+partNum);
}

public postRstockPart(recObj){
  let obj = recObj;
  debugger
 return this.http.post(this.URL+"ReOrder/PostReStockPart?val="+JSON.stringify(obj.val)+"&logId="+obj.logId+"&otherQty="+obj.otherQty, obj);
}
getPartNumber(partNum, locationId)
{
  debugger
 return this.http.get(this.URL+"InventoryManagement/GetPartNumber?partNumber="+partNum+"&locationId="+locationId);
}
}
