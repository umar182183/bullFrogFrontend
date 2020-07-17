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
  
 return this.http.post(this.URL+"ReOrder/AddEdit?serialized="+JSON.stringify(obj)+
                        "&isApproved="+obj.isApproved+"&isDelete="+obj.isDelete+"&isEdit="+
                        obj.isEdit+"&isAdd="+obj.isAdd, obj);
}

}
