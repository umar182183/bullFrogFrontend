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
  let objReceived = {
    serialized: obj,
    isAdd: obj.isAdd,
    isApproved: obj.isApproved,
    isDelete: obj.isDelete,
    isEdit: obj.isEdit
  };
  let serializedObj: any = JSON.stringify(objReceived.serialized);
 return this.http.post(this.URL+"ReOrder/AddEdit?serialized="+serializedObj+
                        "&isApproved="+objReceived.isApproved+"&isDelete="+objReceived.isDelete+"&isEdit="+
                        objReceived.isEdit+"&isAdd="+objReceived.isAdd, objReceived);
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
  debugger
  let partObj = JSON.stringify(partNum);
 return this.http.get(this.URL+"ReOrder/GetVendorName?part="+partObj);
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

PutBackLogStatusPost(idRec, statusRec)
{
  let serializedStatus = JSON.stringify(statusRec);
  let obj = {
    id: idRec,
    status: statusRec
  }
 return this.http.post(this.URL+"ReOrder/PutBackLogStatusPost?status="+serializedStatus+"&id="+idRec, obj);
}

}
