import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LocationLookupService } from '../../services/location-lookup.service';
import { DomSanitizer } from '@angular/platform-browser';
import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'location-lookup',
  templateUrl: './location-lookup.component.html',
  styleUrls: ['./location-lookup.component.css']
})
export class LocationLookupComponent implements OnInit {
  
  @ViewChild('openPopup', { static: false }) openPopup: ModalDirective;
  
  public tableData: [] = [];
  public url;
  public imgToShow: any;
  public loading = false;
  public loader = false;
  public tableLoader = true;
  public isReset = true;
  public isSelected = false;
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
    debugger
    this.loader = true;
    this.partNumber = partNum;
    this.locationService.getLocationdata(partNum).subscribe((data: any) => {
     debugger
      this.tableData =data.responseData.data;
      this.loader = false;
      this.tableLoader = false;
      this.options = [];
      if (this.tableData.length !=0) {
      this.loading = true;
      }
      // console.log("data", this.tableData)
    });

    this.locationService.getImgUrl(partNum).subscribe((image:Blob) => {
      debugger
    const reader = new FileReader();
    reader.readAsDataURL(image); 
    reader.onload = (event: any) => {
      // called once readAsDataURL is completed
      let safe: any = this.senitizer.bypassSecurityTrustUrl(event.target.result as string);
      this.url = safe.changingThisBreaksApplicationSecurity;
      // console.log(this.url);


    };
//     reader.onloadend = function() {
//       debugger
//     let ele = document.getElementsByClassName("image3");
//     ele[0].setAttribute("src", reader.result.toString());

//    console.log(reader.result) ;
// }

});
}
 
  
  
  resetData()
  {
    this.tableData = [];
    this.tableLoader = true;
    this.myControl.setValue('', {emitEvent: false});
    this.isReset = true;
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
           if (valueGot != "") {
           this.isReset = false;
           }
           if (this.options.length == 1 && this.isSelected == false) {
             this.selectPartNum(this.options[0]);
           }
           if (this.options.length == 0) {
             this.tableData = [];
             this.tableLoader = true;
           }
           this.isSelected = false;
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
        // document.getElementsByTagName("input")[0].setAttribute("value", partNumStr);
        let partNum = partNumStr.split(":", 2); 
        this.tableData = [];
        this.isSelected = true;
    this.myControl.setValue(this.options[0], {emitEvent: false});

        this.loadLocationData(partNum[0]);
        this.options = [];
        
      }
    }
  
  loadPartsList()
  {
    this.loader = true;
    this.locationService.getPartsList().subscribe((data: any) =>
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

  openImgModal()
  {
    var modal = document.getElementById("myModal");

    let modalImg = document.getElementById("img01");
    var img = document.getElementById("myImg");
      modal.style.display = "block";
    
    this.openPopup.show();
  }
}
