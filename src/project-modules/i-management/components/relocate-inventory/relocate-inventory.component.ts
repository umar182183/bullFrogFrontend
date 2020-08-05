import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { StockInventoryService } from '../../services/stock-inventory.service';
import { RelocateService } from '../../services/relocate.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'relocate-inventory',
  templateUrl: './relocate-inventory.component.html',
  styleUrls: ['./relocate-inventory.component.css']
})
export class RelocateInventoryComponent implements OnInit {
  
  @ViewChild('openPopup', { static: false }) openPopup: ModalDirective;
  @ViewChild('locationModal', { static: false }) locationModal: ModalDirective;
  @ViewChild('qtyModal', { static: false }) qtyModal: ModalDirective;

  public result: boolean = false;
  public loader = false;
  public isReset = true;
  public isSelected = false;
  public anotherLocation = false;
  public isBuildingSelected = false;
  public isAreaSelected = false;
  public isAisleSelected = false;
  public isStackSelected = false;
  public partNumber;
  public location;
  public selectedBuilding;
  public selectedArea;
  public selectedAisle;
  public selectedStack;
  public selectedBlock;
  public oldLocationId;
  public areaId;
  public areaName;
  public aisle;
  public stack;
  public stackPosition;
  public partDesc;
  public locationId: number = 0;
  public numberOfBoxes: number = 0;
  public qtyPerBox: number = 0;
  public totalQty: number = 0;
  public partDataArr: any[] = [];
  public partListArr: any[] = [];
  public buildingsArr: any[] = [];
  public areasArr: any[] = [];
  public aislesArr: any[] = [];
  public stacksArr: any[] = [];
  public stackPositionsArr: any[] = [];
  public locationDataObj: any = {};
  public openLocationObj: any = {};
  public openLocationBackObj: any = {};


  public myControl = new FormControl();
  public options: any[] = [];
  public optionsBackupArr: string[] = [];
  filteredOptions: Observable<string[]>;
  
  constructor(private appService: AppService, private stockService: StockInventoryService,
    private relocateService: RelocateService, private toastr: ToastrService
    ){}

  
  
ngOnInit() {
    this.appService.updateCurrentModule('restock');
    this.getClickCall();

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      debounceTime(1400),
      distinctUntilChanged(),
      map(valueGot =>{ 
        debugger
         this.options = this._filter(valueGot);
         if (valueGot != "") {
         this.isReset = false;
        //  this.tableData = [];
        //    this.tableLoader = true;
         }
         if (this.options.length == 1 && this.isSelected == false) {
           this.selectPartNum(this.options[0]);
         }
         if (this.options.length == 0) {
          //  this.tableData = [];
          //  this.tableLoader = true;
         }
         this.isSelected = false;
        return this.options;
      })
    );
    this.loadPartsList();
}

selectPartNum(partNumStr)
    {
      if (partNumStr != "" && partNumStr != undefined) {
        // document.getElementsByTagName("input")[0].setAttribute("value", partNumStr);
        let partNum = partNumStr.split(":", 2); 
        // this.tableData = [];
        this.isSelected = true;
        
        let selectedPart = this.partListArr.filter((part: any)=> {
          
          if (part.partNumber == partNumStr) {
            
            return part ;
          }
        });
        debugger
        this.partDesc = selectedPart[0].partDescription;
    this.myControl.setValue(this.options[0], {emitEvent: false});

        this.getPartNumData(partNum[0]);
        this.options = [];
        
      }
    }

private _filter(value: string): string[] {
  const filterValue = value?value.toLowerCase(): value;
  let arr = this.optionsBackupArr;
  return arr.filter(option => option.toLowerCase().includes(filterValue));
}

resetData()
{
  this.myControl.setValue('', {emitEvent: false});
  let setDesc: any = document.getElementById("part-description");
  setDesc.value = '';

  this.isReset = true;
}

getResult()
{
  this.result = true;
  this.qtyModal.hide();
}

removeModalClass()
{
  // let backdrop = document.getElementsByClassName("modal-backdrop");
  // if (backdrop.length > 1) {
  //   for (let index = 0; index < backdrop.length; index++) {
  //     backdrop[index].remove();
  //   }
  // }

}
goNext()
{
  this.openPopup.hide();
  this.qtyModal.show();
}

getClickCall()
{
  this.stockService.currentComponent$.subscribe(currentComonent => {
    if (currentComonent == 'relocate-inventory') {
    this.openPopup.hide();
      this.qtyModal.hide();
      this.result = false;
      this.openPopup.show();
    }
  });
}

loadPartsList()
{
  this.loader = true;
  this.relocateService.getPartsList().subscribe((data: any) =>
  {
    if (data.success == false) {
      this.toastr.info(data.responseData)
    }
    data.responseData.forEach(element => {
      this.optionsBackupArr.push(element.partNumber)
    });
    this.partListArr = data.responseData;
    this.loader = false;
  });
}

getPartNumData(partNum)
{
  this.partDataArr = [];
  this.loader = true;
  this.partNumber = partNum;
  this.relocateService.getPartNumber(partNum).subscribe((data: any)=> {
    debugger
    this.partDataArr = data.responseData.data;
    if (this.partDataArr.length != 0) {
    
      this.location = this.partDataArr[0].location;

    if (this.partDataArr.length > 1) {
      this.qtyModal.hide();
      this.openPopup.hide();
      this.locationModal.show();
    }
    else{
      let locationId = this.partDataArr? this.partDataArr[0].locationId: "";
      this.locationId = locationId;
      this.getLocationById(locationId, partNum);
    }
    }
    else{
      this.toastr.info("No location found for part number: "+this.partNumber);
    }
    this.loader = false;
  })
}

getLocationById(locationId, partNum)
{
  this.locationDataObj = {};
  this.relocateService.getLocationById(locationId, partNum).subscribe((data: any) => {
    debugger
    this.locationDataObj = data.responseData;
  });
}

boxesModelChanged(event)
{
  debugger
  event = +event;
  this.numberOfBoxes = 0;
  this.numberOfBoxes = event;
  this.totalQty = 0;
  this.totalQty = this.numberOfBoxes * this.qtyPerBox;
}

qtyModelChanged(event)
  {
  debugger
  event = +event;
  this.qtyPerBox = 0;
  this.qtyPerBox = event;
  this.totalQty = 0;
  this.totalQty = this.numberOfBoxes * this.qtyPerBox;
  }
getFinalResult(){
  this.getResult();
  this.removeModalClass();
  this.loader = true;
  this.myControl.reset();
  let obj = {
    partnumber: this.partNumber,
    sreen: "relocate",
    qty: this.totalQty,
    locationId: this.locationId,
    returnUrl: "",
    onlyforBluffdate: false
  }
  this.relocateService.assignLocation(obj).subscribe((data: any) => {
    debugger
   this.openLocationObj =  data.responseData;
   this.openLocationBackObj =  data.responseData;
    this.loader = false;
    this.loadBuildings();

  });
}
getLocationId(locationIdRec)
{
  debugger
  this.getLocationById(locationIdRec, this.partNumber);
}

getSelectedBuilding(buildingId)
{
  debugger
//  this.selectedBuilding = buildingName;
 this.isBuildingSelected = true;
 this.loadAreas(buildingId);

}

getSelectedArea(areaId)
{
  debugger
  // this.selectedArea = areaId;
 this.isAreaSelected = true;
 this.areaId = areaId;
 this.loadAisles(areaId);

}
getSelectedAisle(aisleName)
{
  debugger
  // this.selectedAisle = aisleName;
 this.isAisleSelected = true;
  this.aisle = aisleName;
  this.loadStacks(this.areaId, aisleName);
}
getSelectedStack(stack)
{
  debugger
  // this.selectedStack = stack;
  this.stack = stack;
 this.isStackSelected = true;
 this.loadStackPositions(this.areaId, this.aisle, stack)

}
getSelectedBlock(block)
{
  debugger
  this.selectedBlock = block;
}

selectAnotherLocation(checked)
{
  debugger
  if (checked) {
  this.anotherLocation = true;
  }
  else{
    this.anotherLocation = false;
  }
}

applyFilter(filterValue: string)
{
  debugger
  if (filterValue == "") {

    this.openLocationObj.buildings = this.openLocationBackObj.buildings;
    this.openLocationObj.areas = this.openLocationBackObj.areas;
    this.openLocationObj.openLocationList = this.openLocationBackObj.openLocationList;

  } 
  else {
    
    const filteredValue = filterValue? filterValue.toLowerCase(): filterValue;

 let arr1 = this.openLocationBackObj.buildings;
 let arr2 = this.openLocationBackObj.areas;
 let arr3 = this.openLocationBackObj.openLocationList;
 this.openLocationObj.buildings =  arr1.filter(option =>{
        return option.buildingName?.toLowerCase()?.includes(filteredValue)
      })
 this.openLocationObj.areas = arr2?.filter(option =>{
        return option.areaName?.toLowerCase()?.includes(filteredValue)
        })
  this.openLocationObj.openLocationList = arr3?.filter(option =>{
        return option.location?.toLowerCase()?.includes(filteredValue)
        })
  }
 
}

loadBuildings()
{
  this.relocateService.getBuildings().subscribe((data: any) => {
    debugger
    this.buildingsArr = data.data;
  });
}

loadAreas(buildingId)
{
  this.relocateService.getAreasByBuildingId(buildingId).subscribe((data: any) => {
    debugger
    this.areasArr = data.responseData.data;
  });
}

loadAisles(areaId)
{
  this.relocateService.getAisle(areaId).subscribe((data: any) => {
    debugger
    this.aislesArr = data.responseData.data;
  });
}

loadStacks(areaId, aisle)
{
  this.relocateService.getStack(areaId, aisle).subscribe((data: any) => {
    debugger
    this.stacksArr = data.responseData.data;
  });
}

loadStackPositions(areaId, aisle, stack)
{
  this.relocateService.getStackPosition(areaId, aisle, stack).subscribe((data: any) => {
    debugger
    this.stackPositionsArr = data.responseData.data;
  });
}

submitResults(){
  this.result = false;
  let obj = {
    locationId: this.locationId,
    oldLocationId: this.oldLocationId,
    areaId: this.areaId,
    qty: this.totalQty,
    stack: this.stack,
    areaName: this.areaName,
    partNumber: this.partNumber,
    aisleName: this.aisle,
    stackPosition: this.stackPosition,
    returnUrl: ''
  }
  this.relocateService.editLocation(obj).subscribe((res: any) => {
    debugger
    res
  })
}
}