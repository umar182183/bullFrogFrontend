import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';
import { FormControl } from '@angular/forms';
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
  constructor(private appService: AppService, private locationService: LocationLookupService, private senitizer: DomSanitizer){}
  
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  loadLocationData(partNum)
  {
    this.loader = true;
    this.locationService.getLocationdata(partNum).subscribe((data: any) => {
      this.tableData =data.responseData.data;
      this.loader = false
      if (this.tableData.length !=0) {
      this.loading = true;
      }
      console.log("data", this.tableData)
    });

    this.locationService.getImgUrl(partNum).subscribe((image:Blob) => {
let mySrc;
const reader = new FileReader();
reader.readAsDataURL(image); 
reader.onloadend = function() {
debugger

   document.querySelector(".image").setAttribute("src", reader.result.toString());

  //  console.log("mySrc: ", mySrc)   
}
this.imgToShow= mySrc;
    })

  }
  toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
  
  
  
  resetData()
  {
    this.loader = false;
    this.loading = false;
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
