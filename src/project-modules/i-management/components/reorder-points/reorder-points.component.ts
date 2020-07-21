import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';
import { ReorderPointsService } from '../../services/reorder-points.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { LocationLookupService } from '../../services/location-lookup.service';

@Component({
  selector: 'reorder-points',
  templateUrl: './reorder-points.component.html',
  styleUrls: ['./reorder-points.component.css']
})
export class ReorderPointsComponent implements OnInit {
  
  constructor(private appService: AppService,
    private reorderService: ReorderPointsService,
    private locationService: LocationLookupService,
    ){}

  @ViewChild('logDetails', { static: false }) logDetails: ModalDirective;
  @ViewChild('approveLogModal', { static: false }) approveLogModal: ModalDirective;
  @ViewChild('markReceivedModal', { static: false }) markReceivedModal: ModalDirective;
  @ViewChild('deleteLogModal', { static: false }) deleteLogModal: ModalDirective;
  @ViewChild('editLogModal', { static: false }) editLogModal: ModalDirective;
  @ViewChild('editLog2Modal', { static: false }) editLog2Modal: ModalDirective;
  @ViewChild('addNewLogModal', { static: false }) addNewLogModal: ModalDirective;
  
  public tableData: any[] = [];
  public loader:boolean = false;
  public IsClosedCurrent: boolean = false;
  public isReview: boolean = false;
  public isPurchasePending: boolean = false;
  public isOpenPO: boolean = false;
  public isPutAway: boolean = false;
  public reviewLogArr: any[] = [];
  public restockLogArr: any[] = [];
  public partPopupArr: any[] = [];
  public approvedLogsArr: any[] = [];
  public purchasingPendingArr: any[] = [];
  public openPOArr: any[] = [];
  public toPutAwayArr: any[] = [];
  public allvendorListArr: any[] = [];
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
  public dateRequired;
  public notesRec;
  public logReviewed;
  public objToSend = {};

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  
  ngOnInit() {
    this.appService.updateCurrentModule('restock');
    this.loadReorderData();
    this.loadPartsList();

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
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
      debugger
      data.responseData.forEach(element => {
        this.options.push(element.partNumber)
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
  this.restockLogArr = [];
  this.reorderService.getrestockLog(param).subscribe((data: any) => {
    
   this.restockLogArr = data.list;
  });
}

submitApprove(poNum, poDueDate)
{
debugger
this.partPoNum = '';
this.partPoNum = poNum;
this.partPoDuedate = '';
this.partPoDuedate = poDueDate;
  if (this.partStatus == 'Purchasing Pending')
  {
    if (this.approvedLogsArr.length > 1) {

      this.objToSend = {};
      this.objToSend = {
       status: this.statusToSend,
       PoNum:"",
       PODueDate: this.partPoDuedate,
       ApprovedLogs: this.approvedLogsArr.toString(),
       PONum: this.partPoNum,
      }
      this.escalateMultiApproveLogs();

    } 
    else {
      this.objToSend = {};
      this.objToSend = {
       id: this.partId,
       status: this.statusToSend,
       isApproved: true,
       isDelete: false,
       isEdit: false,
       isAdd: false,
       PoNum:"",
       PODueDate: this.partPoDuedate,
       PONum: this.partPoNum,
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
this.reorderService.addEditLog(this.objToSend).subscribe((res: any) => {

        debugger
       this.resetData();
      });
 }

 private resetData()
 {
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
this.reorderService.getMultiApproveLogs(this.objToSend).subscribe((res: any) => {

        debugger
        this.approveLogModal.hide();
        res
      });
 }

public processApproveRequest()
{
  this.objToSend = {};
  this.objToSend = {
    id: this.partId,
    status: this.statusToSend,
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

editLog(partNum, partDesc, partDateCreated, partId, status)
{
  debugger
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
  status == 'Review'? this.editLogModal.show(): this.editLog2Modal.show();
}

getSelectedVendor(selectedVendor)
{
  debugger
  this.selectedVendor = selectedVendor
}

saveEditedLog()
{
  debugger

  this.objToSend = {};
  this.objToSend = {
    id: this.partId,
    PartNo: this.partNum,
    Description: this.partDesc,
    Vendor: this.selectedVendor,
    OrderQty: this.orderQty,
    Status: this.statusToSend,
    DatePartsRequired: this.dateRequired,
    Notes: this.notesRec,
    DateCreated: this.partDateCreated,
    PONum: this.partPoNum,
    PODueDate: this.partPoDuedate,
    LogReviewed: this.logReviewed,
    isApproved: false,
    isDelete: false,
    isEdit: true,
    isAdd: false
  }
  this.escalateApproveLog();
}

loadAllVendoList()
{
  this.reorderService.getAllVendorList().subscribe((data: any) => {
    // debugger
   this.allvendorListArr = data.responseData;
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
  
  this.objToSend = {};
  this.objToSend = {
    PartNo: this.partNum,
    Vendor: this.selectedVendor,
    OrderQty: this.orderQty,
    DatePartsRequired: this.dateRequired,
    Notes: this.notesRec,
    LogReviewed: this.logReviewed,
    PartNoObj: {PartNumber: this.partNum, Description: ''},
    isApproved: false,
    isDelete: false,
    isEdit: false,
    isAdd: true
  }
  this.escalateApproveLog();
}

}