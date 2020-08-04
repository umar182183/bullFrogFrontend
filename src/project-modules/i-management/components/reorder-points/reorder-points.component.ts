import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';
import { ReorderPointsService } from '../../services/reorder-points.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LocationLookupService } from '../../services/location-lookup.service';
import { ToastrService } from 'ngx-toastr';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as moment from 'moment';

@Component({
  selector: 'reorder-points',
  templateUrl: './reorder-points.component.html',
  styleUrls: ['./reorder-points.component.css']
})
export class ReorderPointsComponent implements OnInit {
  
  constructor(private appService: AppService,
    private reorderService: ReorderPointsService,
    private locationService: LocationLookupService,
    private toastr: ToastrService
    ){}

  @ViewChild('logDetails') logDetails: ModalDirective;
  @ViewChild('approveLogModal') approveLogModal: ModalDirective;
  @ViewChild('markReceivedModal') markReceivedModal: ModalDirective;
  @ViewChild('deleteLogModal') deleteLogModal: ModalDirective;
  @ViewChild('editLogModal') editLogModal: ModalDirective;
  @ViewChild('editLog2Modal') editLog2Modal: ModalDirective;
  @ViewChild('addNewLogModal') addNewLogModal: ModalDirective;
  @ViewChild('putAwayModal') putAwayModal: ModalDirective;
  @ViewChild('confirmModal') confirmModal: ModalDirective;
  
  public tableDataArr: any[] = [];
  public loader:boolean = false;
  public IsClosedCurrent: boolean = false;
  public isMultipleLocation: boolean = false;
  public isReview: boolean = false;
  public isPurchasePending: boolean = false;
  public isOpenPO: boolean = false;
  public isPutAway: boolean = false;
  public reviewLogArr: any[] = [];
  public partPopupArr: any[] = [];
  public approvedLogsArr: any[] = [];
  public purchasingPendingArr: any[] = [];
  public openPOArr: any[] = [];
  public toPutAwayArr: any[] = [];
  public allvendorListArr: any[] = [];
  public vendorName = "";
  public partLocationArr: any[] = [];
  public openLocationArr: any[] = [];
  public openLocationBackArr: any[] = [];
  public multiLocationArr: any[] = [];
  public singleLocationArr: any[] = [];
  public locationToSendArr: any[] = [];
  public existLogArr: any = {};
  public param;
  public selectedLocation;
  public reviewCount;
  public purchasePendCount;
  public openPoCount;
  public toPutAwayCount;
  public partId;
  public partIdToDel;
  public partStatus;
  public statusToSend;
  public partPoNum;
  public partNum;
  public partDesc;
  public partDateCreated;
  public partPoDuedate;
  public selectedVendor;
  public orderQty;
  public remainingQty: number = 0;
  public dateRequired;
  public notesRec;
  public receivedNotes;
  public logReviewed;
  public objToSend = {};
  public logExists: boolean;
  public isSelected = false;
  public isReset = true;


  myControl = new FormControl();
  options: string[] = [];
  optionsBackupArr: string[] = [];
  public restockLogArr: any[] = [];

  filteredOptions: Observable<string[]>;
  
  ngOnInit() {
    this.appService.updateCurrentModule('restock');
    this.loadReorderData();
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      debounceTime(2000),
      distinctUntilChanged(),
      map(valueGot =>{ 
        debugger
         this.options = this._filter(valueGot);
         if (valueGot != "") {
         this.isReset = false;
         }
         if (this.options.length == 1 && this.isSelected == false) {
           this.selectPartNum(this.options[0]);
         }
         
         this.isSelected = false;
        return this.options;
      })
    );

 
  }

  resetParts()
  {
    // this.myControl.setValue('', {emitEvent: false});
    let ele: any = document.getElementById("selectedPart");
    ele.value = "";
    this.isReset = true;
    this.vendorName = "";
  this.options = [];
  }
 
  private _filter(value: string): string[] {
    const filterValue = value?value.toLowerCase(): value;
    let arr = this.optionsBackupArr;
    return arr.filter(option => option? option.toLowerCase().includes(filterValue): "");
  }

  private _filterRestockArr(value: string): string[] {
    const filterValue = value.toLowerCase();

    let arr = this.tableDataArr;
    return arr.filter(option =>{
      
     return option.partNo.toLowerCase().includes(filterValue) || option.description.toLowerCase().includes(filterValue)
            || option.vendor.toLowerCase().includes(filterValue) || option.orderQty.toString().toLowerCase().includes(filterValue)
            || option.dateCreated.toLowerCase().includes(filterValue) || option.datePartsRequired.toLowerCase().includes(filterValue)
            || option.poNum.toLowerCase().includes(filterValue) || option.poDueDate.toLowerCase().includes(filterValue)
            || option.status.toLowerCase().includes(filterValue) || option.notes.toLowerCase().includes(filterValue);
    });
  }

  applyFilter(filterValue: string)
  {
    
   this.restockLogArr = this._filterRestockArr(filterValue);
  }
  selectPartNum(partNumStr)
  {
    
    let ele: any = document.getElementById("selectedPart");
    ele.value = partNumStr;
    this.partNum = partNumStr;
    this.isSelected = true;
    let partObj ={
      PartNumber: partNumStr,
      Description: ""
    }

    this.loadVendorName(partObj);
    this.options = [];
  }
  

  loadPartsList()
  {
    this.loader = true;
    this.locationService.getPartsList().subscribe((data: any) =>
    
    {
      data.responseData.forEach(element => {
        this.optionsBackupArr.push(element.partNumber)
      });
      this.loader = false;
    });
  }

  loadReorderData()
  {
    this.loader = true;
    this.reviewLogArr = [];
    this.purchasingPendingArr = [];
    this.openPOArr = [];
    this.toPutAwayArr = [];
    this.reorderService.getReOrderData().subscribe((data: any) => {
      debugger
      if (data.success == false) {
        this.toastr.info(data.responseData)
      }
      else{
    this.loadOpenLocations(false);

     this.reviewLogArr = data.responseData.reviewLog;
     this.purchasingPendingArr = data.responseData.purchasingLog;
     this.openPOArr = data.responseData.poPending;
     this.toPutAwayArr = data.responseData.poReceived;
     this.purchasePendCount = data.responseData.log.reorderPurchasingPendingCount;
     this.reviewCount = data.responseData.log.reorderReviewCount;
     this.openPoCount = data.responseData.log.reorderIntransitCount;
     this.toPutAwayCount = data.responseData.log.reorderPutAwayCount;
      this.loader = false;
      }
    });
  }

  getLogDetails(partNum, status)
  {
    this.partPopupArr = [];

    switch (status) {
      case 'Review':
        this.partPopupArr = this.reviewLogArr.filter(p =>
          {
            return p.partNo == partNum;
          });
        break;
    
      case 'Purchasing Pending':
          this.partPopupArr = this.purchasingPendingArr.filter(p =>
            {
              return p.partNo == partNum;
            });
          break;

      case 'PO Pending':
            this.partPopupArr = this.openPOArr.filter(p =>
              {
                return p.partNo == partNum;
              });
            break;

      case 'PO Received':
              this.partPopupArr = this.toPutAwayArr.filter(p =>
                {
                  return p.partNo == partNum;
                });
              break;

    }
    this.logDetails.show();
  }
loadRestockLog(param)
{
 this.param = '';
 this.param = param;
 this.callRestockLogarr()
}
private callRestockLogarr()
{
  this.myControl.reset();
  this.loader = true;
  this.restockLogArr = [];
  // if (this.param == "PO Received") {
  //   this.loadOpenLocations(false);
  // }
  this.reorderService.getrestockLog(this.param).subscribe((data: any) => {
    this.restockLogArr = data.list;
    this.tableDataArr = data.list;
    this.loader = false;
   });
}
submitApprove(poNum, poDueDate)
{

this.partPoNum = '';
this.partPoNum = poNum;
this.partPoDuedate = '';
this.partPoDuedate = poDueDate;
  if (this.partStatus == 'Purchasing Pending')
  {
    if (this.approvedLogsArr.length > 1) {

      this.objToSend = {};
      this.objToSend = {
       status: this.statusToSend? this.statusToSend: "",
       PoNum:"",
       PODueDate: this.partPoDuedate? this.partPoDuedate: "",
       ApprovedLogs: this.approvedLogsArr.toString(),
       PONum: this.partPoNum,
      }
      this.escalateMultiApproveLogs();

    } 
    else {
      this.objToSend = {};
      this.objToSend = {
       id: this.partId,
       status: this.statusToSend? this.statusToSend: "",
       isApproved: true,
       isDelete: false,
       isEdit: false,
       isAdd: false,
       PoNum:"",
       PODueDate: this.partPoDuedate? this.partPoDuedate: "",
       PONum: this.partPoNum? this.partPoNum: "",
    }
  
    this.escalateApproveLog();
   }
  }
}

processMultiApprove()
{
  this.statusToSend = "";
  this.statusToSend = "PO Pending";
  this.partStatus = ''
  this.partStatus = 'Purchasing Pending'
  this.approveLogModal.show();
}

getApproveData(statusGot, id){
  debugger
  this.myControl.reset();
  this.partStatus = '';
  this.partStatus = statusGot;
  this.partId = '';
  this.partId = id;
  this.statusToSend = '';
 

  if (this.partStatus == 'Review') {
    this.statusToSend = '';
    this.statusToSend = "Purchasing Pending";
   this.processApproveRequest();
  }
  if (this.partStatus == 'Purchasing Pending') {
    this.statusToSend = '';
    this.statusToSend = "PO Pending";
    this.partPoDuedate = "";
  this.partPoNum = "";
    this.approveLogModal.show();
  }
  if (this.partStatus == 'PO Pending') {
    this.statusToSend = '';
    this.statusToSend = "PO Received";
    this.partPoDuedate = "";
  this.partPoNum = "";
    this.markReceivedModal.show();
  }
  if (this.partStatus == 'PO Received') {
    this.statusToSend = '';
    this.statusToSend = "Complete";
    this.partPoDuedate = "";
  this.partPoNum = "";
  }
  this.partPoDuedate = "";
  this.partPoNum = "";
  this.myControl.reset();
  
}

private escalateApproveLog()
 {
  this.loader = true;
this.reorderService.addEditLog(this.objToSend).subscribe((res: any) => {

        
        if (res.success == false) {
          this.toastr.error(res.message);
          }
          else{
            this.toastr.info(res.message);
          }
       this.resetData();
       this.loader = false;
 this.approvedLogsArr = [];
 let setPoNum: any = document.getElementById("setPoNum");
 setPoNum.value = "";
 let setPoDueDate: any = document.getElementById("setPoDueDate");
 setPoDueDate.value = "";

       this.callRestockLogarr();
      });
 }

 private resetData()
 {
   
  this.editLogModal.hide();
  this.myControl.reset();
  this.addNewLogModal.hide();
  this.editLog2Modal.hide();
  this.approveLogModal.hide();
  this.markReceivedModal.hide();
  this.deleteLogModal.hide();
  this.partNum = '';
  this.partDateCreated = '';
  this.partDesc = '';
  this.partId = null;
  this.statusToSend = '';
  this.partPoNum = '';
  this.partPoDuedate = '';
  this.logReviewed = false;
  this.selectedVendor = '';
  this.orderQty = '';
 }

private escalateMultiApproveLogs()
 {
  this.loader = true;
this.reorderService.getMultiApproveLogs(this.objToSend).subscribe((res: any) => {

        
        if (res.success == false) {
          this.toastr.error(res.message);
          }
          else{
            this.toastr.info("All Logs Approved Successfully");
          }
        this.approveLogModal.hide();
 this.approvedLogsArr = [];
          this.partPoNum = "";
          this.partPoDuedate = ""
        this.loader = false;
        this.callRestockLogarr();
      });
      let setPoNum: any = document.getElementById("setPoNum");
      setPoNum.value = "";
      let setPoDueDate: any = document.getElementById("setPoDueDate");
      setPoDueDate.value = "";
 }

public processApproveRequest()
{
  this.objToSend = {};
  this.objToSend = {
    id: this.partId,
    status: this.statusToSend? this.statusToSend: "",
    isApproved: true,
    isDelete: false,
    isEdit: false,
    isAdd: false
  }
  this.escalateApproveLog();
}

getCheckedItems(approveCheck, id)
{
    let idToSend = +id;
  if (approveCheck == true) {
        this.approvedLogsArr.push(idToSend);
    } 
  else {
    for( var i = 0; i < this.approvedLogsArr.length; i++){ 
      if ( this.approvedLogsArr[i] == idToSend) { 
          this.approvedLogsArr.splice(i, 1); 
      }
    }
    }
    console.log('Total approvedLogsArr: ', this.approvedLogsArr);
}

processDelete(partNum, partDescription, id)
{
  this.partNum = '';
  this.partNum = partNum;
  this.partDesc = '';
  this.partDesc = partDescription;
  this.partIdToDel = '';
  this.partIdToDel = +id;
  this.deleteLogModal.show();
}

deleteLog()
{
  this.objToSend = {};
      this.objToSend = {
       id: this.partIdToDel,
       isApproved: false,
       isDelete: true,
       isEdit: false,
       isAdd: false,
                  }
      this.escalateApproveLog();
  }

editLog(partNum, partDesc, partDateCreated, partId, status, notes, datePartsRequiredRec, poNumRec, poDueDateRec, vendorRec, ordertQtyRec)
{
  debugger
  this.myControl.reset();  
  this.partNum = '';
  this.partNum = partNum;
  this.partDateCreated = '';
  this.partDateCreated = partDateCreated;
  this.partDesc = '';
  this.partDesc = partDesc;
  this.partId = null;
  this.partId = +partId;
  this.selectedVendor = "";
  this.selectedVendor = vendorRec;
  this.statusToSend = '';
  this.statusToSend = status;
  this.partPoNum = "";
  this.partPoNum = poNumRec;
  this.partPoDuedate = "";
  this.partPoDuedate = poDueDateRec;
  // this.partPoDuedate = moment(this.partPoDuedate).format('DD/MM/YYYY');

  
  this.logReviewed = false;
  this.dateRequired = "";
  this.dateRequired = datePartsRequiredRec;
  // this.dateRequired = moment(this.dateRequired).format('DD/MM/YYYY');
  // let ele: any = document.getElementById("dateReq");
  // ele.value = this.dateRequired;
  // this.selectedVendor = '';
  this.orderQty = "";
  this.orderQty = ordertQtyRec;
  // this.partStatus = '';
  this.notesRec = '';
  this.notesRec = notes;
  // this.myControl.reset();
  this.partStatus = status;
  status == 'Review'? this.editLogModal.show(): this.editLog2Modal.show();
}

getSelectedVendor(selectedVendor)
{
  
  this.selectedVendor = selectedVendor
}

saveEditedLog()
{
  

  this.objToSend = {};
  debugger
  this.objToSend = {
    id: this.partId,
    PartNo: this.partNum,
    Description: this.partDesc,
    Vendor: this.selectedVendor? this.selectedVendor:"",
    OrderQty: this.orderQty? this.orderQty: 0,
    Status: this.statusToSend? this.statusToSend:"",
    DatePartsRequired: this.dateRequired? this.dateRequired: '',
    Notes: this.notesRec? this.notesRec: "",
    DateCreated: this.partDateCreated? this.partDateCreated: "",
    PONum: this.partPoNum?this.partPoNum: "",
    PODueDate: this.partPoDuedate?this.partPoDuedate: "",
    LogReviewed: this.logReviewed,
    isApproved: false,
    isDelete: false,
    isEdit: true,
    isAdd: false
  }
  
  this.escalateApproveLog();
}

loadVendorName(partNum)
{
  this.loader = true;
  this.reorderService.getVendorName(partNum).subscribe((data: any) => {
   this.vendorName = data.responseData;
   this.loader = false;
  });
}

loadAllVendoList()
{
  this.loader = true;
  this.reorderService.getAllVendorList().subscribe((data: any) => {
    
   this.allvendorListArr = data.responseData;
   this.loader = false;
  });
}


addNewLog()
{
  this.loadPartsList();
  this.addNewLogModal.show();
  this.orderQty = '';
  this.dateRequired = '';
  this.notesRec = '';
  this.receivedNotes = '';
  this.options = [];
  this.vendorName = "";
  let ele: any = document.getElementById("selectedPart");
  ele.value = "";
  this.logReviewed = false;
  if (this.restockLogArr.length == 0) {
    this.loader = true;
  }
}

saveNewLog()
{
  
  
  this.objToSend = {};
  this.objToSend = {
    PartNo: this.partNum,
    Vendor: this.vendorName? this.vendorName:"",
    OrderQty: this.orderQty? this.orderQty: 0,
    DatePartsRequired: this.dateRequired? this.dateRequired: "",
    Notes: this.receivedNotes? this.receivedNotes: "",
    LogReviewed: this.logReviewed,
    PartNoObj: {PartNumber: this.partNum, Description: ''},
    isApproved: false,
    isDelete: false,
    isEdit: false,
    isAdd: true
  }
  
  let splittedartNum = this.partNum.split(":", 2); 
  this.logExists = false;
   this.restockLogArr.forEach((element:any) => {
    debugger
    if (element.partNo === splittedartNum[0]) {
      this.partNum = splittedartNum[0];
      this.existLogArr = [];
      this.existLogArr = element;
      return this.logExists = true;
    }
    
  })
  

  if (this.logExists) {
    this.addNewLogModal.hide();
    this.confirmModal.show();
  } else {
  this.escalateApproveLog();
  }
}
setPoDueDate(event)
{
  // this.partPoDuedate = event;
  this.partPoDuedate = moment(event).format('MM/DD/YYYY');

}
setDateRequired(event)
{
  // this.dateRequired = event;
  this.dateRequired = moment(event).format('MM/DD/YYYY');

}

loadExistPartModal()
{
  this.confirmModal.hide();
  this.loadAllVendoList();
  debugger
  // this.selectPartNum(this.partNum);
  if (this.existLogArr?.length != 0) {
    this.editLog(this.partNum, 
      this.existLogArr.description, 
      this.existLogArr.dateCreated, 
      this.existLogArr.id, 
      this.existLogArr.status, 
      this.existLogArr.notes, 
      this.existLogArr.datePartsRequired, 
      this.existLogArr.poNum, 
      this.existLogArr.poDueDate, 
      this.existLogArr.vendor, 
      this.existLogArr.orderQty);
  }
  // this.editLogModal.show();
  // this.myControl.reset();
}

loadPutpartAwayModal(partNum, desc, vendor, qty, poNum, notes)
  {
  this.selectedLocation = "";
  this.partNum = '';
  this.partNum = partNum;
  this.partDesc = '';
  this.partDesc = desc;
  this.selectedVendor = '';
  this.selectedVendor = vendor;
  this.orderQty = '';
  this.orderQty = +qty;
  this.partPoNum = '';
  this.partPoNum = poNum;
  this.notesRec = '';
  this.notesRec = notes;
  if (this.openLocationArr.length == 0) {
    this.loader = true;
  }
  this.remainingQty = this.orderQty;
  this.isMultipleLocation = false;
  this.multiLocationArr = [];
  this.loadLocationdata(partNum);
  this.multiLocationArr = [];
  
  this.putAwayModal.show();
  this.myControl.reset();
  }

loadLocationdata(partNum)
{
  this.loader = true;
  this.reorderService.getLocationdata(partNum).subscribe((data: any) => { 
    this.partLocationArr = data.responseData.data;
    this.loader = false;
  });
}

loadOpenLocations(isBlufdale)
{
  
  this.loader = true;
  this.openLocationArr = [];
  this.openLocationBackArr = [];
  this.reorderService.getOpenLocationdata(isBlufdale).subscribe((data: any) => {
    
    this.openLocationArr = data.responseData;
    this.openLocationBackArr = data.responseData;
    this.loader = false;
  })
}

getSelectedLocation(location, locationObj)
{
  
  this.selectedLocation = location;
 
  if (this.isMultipleLocation == false) {
    this.singleLocationArr.push(locationObj);
  }
  else{
    if (this.multiLocationArr.length == 0) {
      this.multiLocationArr.push(locationObj);
    }
    else{
      let locationArr = [];
    this.multiLocationArr.forEach((res: any) => {
      locationArr.push(res.location);
   });
   let isExist = locationArr.indexOf(location);
   if( isExist === -1) {
     this.multiLocationArr.push(locationObj);
 }
  }
  }
  this.multiLocationArr = this.multiLocationArr.map((a) => {
    return {
      'partNumber': a.partNumber?a.partNumber: 0,
      'qtyInLocation': a.qty? a.qty: 0,
      'location': a.location,
      'newQty': 0,
      'locationId': a.locationId
    }
  });
  
}

getQty(qty, location)
{

qty = +qty;

  
  for (let index = 0; index < this.multiLocationArr.length; index++) {
   if (this.multiLocationArr[index].location == location.location) {
    this.multiLocationArr[index].newQty = qty;
   } 
  }
let totalNewQty = 0;
this.remainingQty = this.orderQty;

for (let i=0; i < this.multiLocationArr.length; i++) {
  totalNewQty = totalNewQty + this.multiLocationArr[i].newQty;
}
this.remainingQty = this.remainingQty - totalNewQty

}
sendPutPartPostReq()
{
  this.loader = true;
  this.putAwayModal.hide();
  this.processApproveRequest();
  this.reorderService.putPartAwayPost(this.isMultipleLocation? this.multiLocationArr: this.singleLocationArr).subscribe((res: any) => {
    
    if (res.success == false) {
      this.toastr.error(res.message);
      }
      else{
        this.toastr.info(res.message);
      }
    this.loader = false;
    this.putAwayModal.hide();
    this.myControl.reset();
    this.loadRestockLog(this.param);
  })
}
putBacklogstatus(statusReceived)
{
  this.statusToSend = statusReceived;
  // let date = moment().format('MM/DD/YYYY');
  // this.dateRequired = date;
  // this.partPoNum = 1234;
  // this.partPoDuedate = date;
  
  this.saveEditedLog();
  this.loader = true;


  if (statusReceived == 'Purchasing Pending') {
    this.partStatus = 'Review';
    
  }
  if (statusReceived == 'PO Pending') {
    this.partStatus = 'Purchasing Pending';
    
  }
  if (statusReceived == 'PO Received') {
    this.partStatus = 'PO Pending';
    
  }
  

  this.reorderService.PutBackLogStatusPost(this.partId, this.partStatus).subscribe((res: any) => {
    
    if (res.success == false) {
      this.toastr.error(res.message);
      }
      else{
        this.toastr.info(res.message);
      }
    this.loader = false;
  })
}

getFilteredOpenLocationArr(value)
{
  
  this.openLocationArr = this._filterOpenLockArr(value)
}
 private _filterOpenLockArr(value: string): string[] {
    const filterValue = value.toLowerCase();

    let arr = this.openLocationBackArr;
    return arr.filter(option =>{
      
     return option.location.toLowerCase().includes(filterValue);
            
    });
  }


}