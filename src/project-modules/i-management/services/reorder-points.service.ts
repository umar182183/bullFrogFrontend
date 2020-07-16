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
  let serializedObj = {
    id: obj.id,
    status: obj.status
  }
 return this.http.post(this.URL+"ReOrder/AddEdit?serialized="+JSON.stringify(serializedObj)+
 "&isApproved="+obj.isApproved+"&isDelete="+obj.isDelete+"&isEdit="+obj.isEdit+"&isAdd="+obj.isAdd, obj);
}

}
