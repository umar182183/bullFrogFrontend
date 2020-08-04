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
  public partNumber;
  public location;
  public partDesc;
  public locationId: number = 0;
  public numberOfBoxes: number = 0;
  public qtyPerBox: number = 0;
  public totalQty: number = 0;
  public partDataArr: any[] = [];
  public partListArr: any[] = [];
  public locationDataObj: any = {};


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
  const filterValue = value.toLowerCase();
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
    let locationId = this.partDataArr? this.partDataArr[0].locationId: "";
    this.locationId = locationId;
      this.location = this.partDataArr[0].location;
    // let IntPartNum: number = +partNum;
    this.getLocationById(locationId, partNum);
    if (this.partDataArr.length > 1) {
      this.qtyModal.hide();
      this.locationModal.show();
    }
    }
    this.loader = false;
  })
}

getLocationById(locationId, partNum)
{
  
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
  let obj = {
    partnumber: this.partNumber,
    sreen: "relocate",
    qty: this.totalQty,
    locationId: this.locationId,
    returnUrl: "",
    onlyforBluffdate: false
  }
  this.relocateService.assignLocation(obj).subscribe((res: any) => {
    debugger
    res;
  });
}


}