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

getrestockLog(param)
{
 return this.http.get(this.URL+"ReOrder/GetReorderRestockLog?param="+param);
}

addEditLog(obj)
{
  debugger
  let objToSend = JSON.stringify(obj);
 return this.http.post(this.URL+"ReOrder/AddEdit?serialized="+objToSend+
                        "&isApproved="+obj.isApproved+"&isDelete="+obj.isDelete+"&isEdit="+
                        obj.isEdit+"&isAdd="+obj.isAdd, obj);
}

getMultiApproveLogs(obj)
{
  debugger
  let objToSend = JSON.stringify(obj);
 return this.http.post(this.URL+"ReOrder/ApprovedLogs?serialized="+objToSend, obj);
}

getAllVendorList()
{
 return this.http.get(this.URL+"ReOrder/GetAllVendorList");
}

getVendorName(partNum)
{
 return this.http.get(this.URL+"ReOrder/GetVendorName?part="+partNum);
}


getLocationdata(partNum)
{
 return this.http.get(this.URL+"InventoryManagement/GetPartNumber?partNumber="+partNum);
}

getOpenLocationdata(isBluffdale)
{
 return this.http.get(this.URL+"ReOrder/PutPartAwayOpenpartLocations?isBluffdale="+isBluffdale);
}


putPartAwayPost(arr)
{
  debugger
 return this.http.post(this.URL+"ReOrder/PutPartAwayPost?data="+JSON.stringify(arr), arr);
}

PutBackLogStatusPost(id, status)
{
 return this.http.get(this.URL+"ReOrder/PutBackLogStatusPost?status="+status+"&id="+id);
}

}
