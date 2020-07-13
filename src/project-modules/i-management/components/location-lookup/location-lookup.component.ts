import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { LocationLookupService } from '../../services/location-lookup.service';
import { DomSanitizer } from '@angular/platform-browser';
import { element } from 'protractor';

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
  constructor(private appService: AppService, private locationService: LocationLookupService, private senitizer: DomSanitizer){}
  
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  loadLocationData(partNum)
  {
    this.loader = true;
    this.locationService.getLocationdata(partNum).subscribe((data: any) => {
      let form = new FormGroup({
        first: new FormControl({name: 'partNumber', disabled: true}),
      });
      form.controls['name'].disable();
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
  // toDataURL(url, callback) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.onload = function() {
  //     var reader = new FileReader();
  //     reader.onloadend = function() {
  //       callback(reader.result);
  //     }
  //     reader.readAsDataURL(xhr.response);
  //   };
  //   xhr.open('GET', url);
  //   xhr.responseType = 'blob';
  //   xhr.send();
  // }
  
  
  
  resetData()
  {
    this.loader = false;
    this.loading = false;
    this.tableLoader = true;
    this.tableData = [];
  }
  
  ngOnInit() {
    this.appService.updateCurrentModule('restock');
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      this.loadPartsList();
    }

    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    selectPartNum(partNumStr)
    {
      let partNum = partNumStr.split(":", 2); 
      this.tableData = [];
      this.loadLocationData(partNum[0]);
    }
  
  loadPartsList()
  {
    this.loader = true;
    this.locationService.getPartsList().subscribe((data: any) =>
    {
      data.responseData.forEach(element => {
        this.options.push(element.partNumber)
      });
      this.loader = false;
    });
  }
}
