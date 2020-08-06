import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StockInventoryService {

  constructor(private http: HttpClient) {
    
  }

  private currentComonentSource = new Subject<string>();
  currentComponent$ = this.currentComonentSource.asObservable();

  updateCurrentComponent(currentModule: string) {
      this.currentComonentSource.next(currentModule);
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
  getOpenLocationdata(isBluffdale)
  {
    return this.http.get(this.URL+"ReOrder/PutPartAwayOpenpartLocations?isBluffdale="+isBluffdale);
  }

  assignLocation(obj)
  {
   return this.http.post(this.URL+"InventoryManagement/AssignLocation?partNumber="+obj.partnumber
            +"&sreen="+obj.sreen+"&qty="+obj.qty+"&locationId="+obj.locationId+"&returnUrl="
            +JSON.stringify(obj.returnUrl)+"&onlyforBluffdate="+obj.onlyforBluffdate, obj);
  }
  getAreasByBuildingId(buildingId)
  {
   return this.http.get(this.URL+"InventoryManagement/GetAreasByBuildingId?buildingId="+buildingId);
  }
  getBuildings()
  {
   return this.http.get("http://testbms.bullfrogspas.com/InventoryManagement/InventoryManagement/GetBuildings");
  }
  getAisle(areaId)
  {
   return this.http.get(this.URL+"InventoryManagement/GetAisle?areaId="+areaId);
  }

  getStack(areaId, aisle?)
  {
   return this.http.get(this.URL+"InventoryManagement/GetStack?areaId="+areaId+"&aisle="+aisle);
  }
  getStackPosition(areaId, aisle, stack)
  {
   return this.http.get(this.URL+"InventoryManagement/GetStackPosition?areaId="+areaId+"&aisle="+aisle+"&stack="+stack);
  }
  // getLocationList(onlyForBluffdale)
  // {
  //  return this.http.get(this.URL+"InventoryManagement/GetLocationList?onlyForBluffdale="+onlyForBluffdale);
  // }

  editLocation(obj)
  {
   return this.http.post(this.URL+"InventoryManagement/Editlocation?locationId="+
      obj.locationId+"&oldLocationId="+obj.oldLocationId+"&areaId="+obj.areaId+"&qty="+obj.qty+"&stack="+obj.stack
      +"&areaName="+obj.areaName+"&partNumber="+obj.partNumber+"&aisleName="+obj.aisleName+"&stackPosition="+obj.stackPosition+"&returnUrl="+obj.returnUrl, obj);
  }
  


}
