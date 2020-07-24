import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LocationLookupService } from '../../services/location-lookup.service';
import { DomSanitizer } from '@angular/platform-browser';
import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'location-lookup',
  templateUrl: './location-lookup.component.html',
  styleUrls: ['./location-lookup.component.css']
})
export class LocationLookupComponent implements OnInit {
  
  public tableData: [] = [];
  public imgToShow: any;
  public loading = false;
  public loader = false;
  public tableLoader = true;
  public partNumber;
  constructor(private appService: AppService, private locationService: LocationLookupService,
    private toastr: ToastrService, 
    private senitizer: DomSanitizer){}
  
  myControl = new FormControl();
  options: any[] = [];
  optionsBackupArr: string[] = [];
  filteredOptions: Observable<string[]>;

  loadLocationData(partNum)
  {
    this.loader = true;
    this.partNumber = partNum;
    this.locationService.getLocationdata(partNum).subscribe((data: any) => {
     
      this.tableData =data.responseData.data;
      this.loader = false;
      this.tableLoader = false;
      
      if (this.tableData.length !=0) {
      this.loading = true;
      }
      console.log("data", this.tableData)
    });

    this.locationService.getImgUrl(partNum).subscribe((image:Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(image); 
    reader.onloadend = function() {
    let ele = document.getElementsByClassName("image3");
    ele[0].setAttribute("src", reader.result.toString());

}

});
}
 
  
  
  resetData()
  {
    this.tableData = [];
    this.tableLoader = true;
  }
  
  ngOnInit() {
    this.appService.updateCurrentModule('restock');
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(2000),
        distinctUntilChanged(),
        map(valueGot =>{ 
          debugger
           this.options = this._filter(valueGot);
           if (this.options.length == 1) {
             debugger
             valueGot = this.options[0];
             this.selectPartNum(valueGot);
           this.myControl.setValue(this.options[0], {emitEvent: false});
            this.options = [];
           }
           if (this.options.length == 0) {
             this.tableData = [];
             this.tableLoader = true;
           }
          return this.options;
        })
      );
      this.loadPartsList();
    }

    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
      let arr = this.optionsBackupArr;
      return arr.filter(option => option.toLowerCase().includes(filterValue));
    }

    selectPartNum(partNumStr)
    {
      
      if (partNumStr != "" && partNumStr != undefined) {
        document.getElementsByTagName("input")[0].setAttribute("value", partNumStr);
        let partNum = partNumStr.split(":", 2); 
        this.tableData = [];
        this.loadLocationData(partNum[0]);
      }
    }
  
  loadPartsList()
  {
    this.loader = true;
    this.locationService.getPartsList().subscribe((data: any) =>
    {
      debugger
      data.responseData.forEach(element => {
        this.optionsBackupArr.push(element.partNumber)
      });
      this.loader = false;
    });
  }
}
