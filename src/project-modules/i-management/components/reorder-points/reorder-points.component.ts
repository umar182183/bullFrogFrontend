import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';
import { ReorderPointsService } from '../../services/reorder-points.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'reorder-points',
  templateUrl: './reorder-points.component.html',
  styleUrls: ['./reorder-points.component.css']
})
export class ReorderPointsComponent implements OnInit {
  
  constructor(private appService: AppService,
    private reorderService: ReorderPointsService
    ){}

  @ViewChild('logDetails', { static: false }) logDetails: ModalDirective;
  
  public loader:boolean = false;
  public IsClosedCurrent: boolean = false;
  public isReview: boolean = false;
  public isPurchasePending: boolean = false;
  public isOpenPO: boolean = false;
  public isPutAway: boolean = false;
  public reviewLogArr: any[] = [];
  public restockLogArr: any[] = [];
  public partPopupArr: any[] = [];
  public purchasingPendingArr: any[] = [];
  public openPOArr: any[] = [];
  public toPutAwayArr: any[] = [];
  public reviewCount;
  public purchasePendCount;
  public openPoCount;
  public toPutAwayCount;
  
  ngOnInit() {
    this.appService.updateCurrentModule('restock');
    this.loadReorderData();
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

getApproved(statusGot, id){
  debugger
  if (statusGot == "Review") {
    let status = "Purchasing Pending";
  
  let obj = {
    id: id,
    status: status,
    isApproved: true,
    isDelete: false,
    isEdit: false,
    isAdd: false
  }
  let serializedObj = {
    
  }
  this.reorderService.addEditLog(obj).subscribe((res: any) => {
    debugger
    res
  })
}
}

}