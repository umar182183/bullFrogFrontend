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

  @ViewChild('logDetails', { static: false }) logDetails: ModalDirective;
  @ViewChild('approveLogModal', { static: false }) approveLogModal: ModalDirective;
  @ViewChild('markReceivedModal', { static: false }) markReceivedModal: ModalDirective;
  @ViewChild('deleteLogModal', { static: false }) deleteLogModal: ModalDirective;
  @ViewChild('editLogModal', { static: false }) editLogModal: ModalDirective;
  @ViewChild('editLog2Modal', { static: false }) editLog2Modal: ModalDirective;
  @ViewChild('addNewLogModal', { static: false }) addNewLogModal: ModalDirective;
  @ViewChild('putAwayModal', { static: false }) putAwayModal: ModalDirective;
  @ViewChild('confirmModal', { static: false }) confirmModal: ModalDirective;
  
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
  public partLocationArr: any[] = [];
  public openLocationArr: any[] = [];
  public openLocationBackArr: any[] = [];
  public multiLocationArr: any[] = [];
  public singleLocationArr: any[] = [];
  public locationToSendArr: any[] = [];
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
  public remainingQty;
  public cumulatedQty: number = 0;
  public remainQty: number = 0;
  public dateRequired;
  public notesRec;
  public logReviewed;
  public objToSend = {};
  public logExists: boolean;

  myControl = new FormControl();
  options: string[] = [];
  optionsBackupArr: string[] = [];
  public restockLogArr: any[] = [];

  filteredOptions: Observable<string[]>;
  
  ngOnInit() {
    this.appService.updateCurrentModule('restock');
    this.loadReorderData();
    this.loadPartsList();

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(2000),
        distinctUntilChanged(),
        map(value =>{ 
          debugger
           this.options = this._filter(value);
           return this.options;
        })
      );

  }
 
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    let arr = this.optionsBackupArr;
    return arr.filter(option => option.toLowerCase().includes(filterValue));
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
    this.partNum = partNumStr;
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
     this.reviewLogArr = data.responseData.reviewLog;
     this.purchasingPendingArr = data.responseData.purchasingLog;
     this.openPOArr = data.responseData.poPending;
     this.toPutAwayArr = data.responseData.poReceived;
     this.purchasePendCount = data.responseData.log.reorderPurchasingPendingCount;
     this.reviewCount = data.responseData.log.reorderReviewCount;
     this.openPoCount = data.responseData.log.reorderIntransitCount;
     this.toPutAwayCount = data.responseData.log.reorderPutAwayCount;
      this.loader = false;
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
  this.loader = true;
  this.restockLogArr = [];
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
    this.approveLogModal.show();
  }
  if (this.partStatus == 'PO Pending') {
    this.statusToSend = '';
    this.statusToSend = "PO Received";
    this.markReceivedModal.show();
}
}

private escalateApproveLog()
 {
  this.loader = true;
this.reorderService.addEditLog(this.objToSend).subscribe((res: any) => {

        debugger
        if (res.success == false) {
          this.toastr.error(res.message);
          }
          else{
            this.toastr.success(res.message);
          }
       this.resetData();
       this.loader = false;
       this.callRestockLogarr();
      });
 }

 private resetData()
 {
   debugger
   this.myControl.reset();
  this.editLogModal.hide();
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

        debugger
        if (res.success == false) {
          this.toastr.error(res.message);
          }
          else{
            this.toastr.success("All Logs Approved Successfully");
          }
        this.approveLogModal.hide();
        this.loader = false;
        this.callRestockLogarr();
      });
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

editLog(partNum, partDesc, partDateCreated, partId, status, notes)
{
  
  this.partNum = '';
  this.partNum = partNum;
  this.partDateCreated = '';
  this.partDateCreated = partDateCreated;
  this.partDesc = '';
  this.partDesc = partDesc;
  this.partId = null;
  this.partId = +partId;
  this.statusToSend = '';
  this.statusToSend = status;
  this.partPoNum = '';
  this.partPoDuedate = '';
  this.logReviewed = false;
  this.selectedVendor = '';
  this.orderQty = '';
  this.partStatus = '';
  this.notesRec = '';
  this.notesRec = notes;
  debugger
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
  debugger
  this.escalateApproveLog();
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
  this.addNewLogModal.show();
  this.orderQty = '';
  this.dateRequired = '';
  this.notesRec = '';
  this.logReviewed = false;
  this.loadAllVendoList();
}

saveNewLog()
{
  debugger
  
  this.objToSend = {};
  this.objToSend = {
    PartNo: this.partNum,
    Vendor: this.selectedVendor? this.selectedVendor:"",
    OrderQty: this.orderQty? this.orderQty: "",
    DatePartsRequired: this.dateRequired? this.dateRequired: "",
    Notes: this.notesRec? this.notesRec: "",
    LogReviewed: this.logReviewed,
    PartNoObj: {PartNumber: this.partNum, Description: ''},
    isApproved: false,
    isDelete: false,
    isEdit: false,
    isAdd: true
  }
  let splittedartNum = this.partNum.split(":", 2); 

   this.restockLogArr.forEach((element:any) => {
    
    if (element.partNo.includes(splittedartNum[0])) {
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

loadExistPartModal()
{
  this.confirmModal.hide();
  this.editLogModal.show();
}

loadPutpartAwayModal(partNum, desc, vendor, qty, poNum, notes)
  {
  
  this.partNum = '';
  this.partNum = partNum;
  this.partDesc = '';
  this.partDesc = desc;
  this.selectedVendor = '';
  this.selectedVendor = vendor;
  this.orderQty = '';
  this.orderQty = qty;
  this.partPoNum = '';
  this.partPoNum = poNum;
  this.notesRec = '';
  this.notesRec = notes;
  this.remainQty = +this.orderQty;

  this.loadLocationdata(partNum);
  this.loadOpenLocations(false);
  this.multiLocationArr = [];
  this.putAwayModal.show();
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
  this.reorderService.getOpenLocationdata(isBlufdale).subscribe((data: any) => {
    
    this.openLocationArr = data.responseData;
    this.openLocationBackArr = data.responseData;
    this.loader = false;
  })
}

getSelectedLocation(location, locationObj)
{
  debugger
  this.selectedLocation = location;
  
  let previousLocation = this.multiLocationArr.includes(location);
  if (!previousLocation) {
  this.multiLocationArr.push(locationObj);
  }
  if (this.isMultipleLocation == false) {
    this.singleLocationArr.push(locationObj);
  }
}

getQty(qty, location)
{
debugger
this.multiLocationArr.forEach((res: any) => {
   if (res.location.indexOf(location)) {
     res.qty = +qty;
   } 
});
if (qty.length == 0) {
this.remainQty = this.remainQty + this.cumulatedQty;
} else {
  this.cumulatedQty =  (+qty);
this.remainQty = this.remainQty - this.cumulatedQty;
}

}
sendPutPartPostReq()
{
  this.loader = true;
  this.reorderService.putPartAwayPost(this.isMultipleLocation? this.multiLocationArr: this.singleLocationArr).subscribe((res: any) => {
    debugger
    if (res.success == false) {
      this.toastr.error(res.message);
      }
      else{
        this.toastr.success(res.message);
      }
    this.loader = false;
    this.putAwayModal.hide();
  })
}
putBacklogstatus()
{
  this.loader = true;
  this.reorderService.PutBackLogStatusPost(this.partId, this.partStatus).subscribe((res: any) => {
    debugger
    if (res.success == false) {
      this.toastr.error(res.message);
      }
      else{
        this.toastr.success(res.message);
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