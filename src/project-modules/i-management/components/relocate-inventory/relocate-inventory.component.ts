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


  myControl = new FormControl();
  options: any[] = [];
  optionsBackupArr: string[] = [];
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
    this.myControl.setValue(this.options[0], {emitEvent: false});

        // this.loadLocationData(partNum[0]);
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
  this.isReset = true;
}

getResult()
{
  this.result = true;
  this.qtyModal.hide();
}

removeModalClass()
{
  let backdrop = document.getElementsByClassName("modal-backdrop");
  if (backdrop.length > 1) {
    for (let index = 0; index < backdrop.length; index++) {
      backdrop[index].remove();
    }
  }

}
goNext()
{
  this.openPopup.hide();
  this.locationModal.show();
}

getClickCall()
{
  this.stockService.currentComponent$.subscribe(currentComonent => {
    if (currentComonent == 'relocate-inventory') {
    this.openPopup.hide();
      this.locationModal.hide();
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
    this.loader = false;
  });
}


}