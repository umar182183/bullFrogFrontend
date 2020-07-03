import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { LocationLookupService } from '../../services/location-lookup.service';

@Component({
  selector: 'location-lookup',
  templateUrl: './location-lookup.component.html',
  styleUrls: ['./location-lookup.component.css']
})
export class LocationLookupComponent implements OnInit {
  
  public tableData: [] = [];
  public partNum = "58-1422";
  constructor(private appService: AppService, private locationService: LocationLookupService){}
  
  myControl = new FormControl();
  options: string[] = ['65-1422', '65-2422', '61-1422', '60-1422', '59-1422'];
  filteredOptions: Observable<string[]>;

  loadLocationData()
  {
    this.locationService.getLocationdata(this.partNum).subscribe((data: any) => {
      this.tableData =data;
      console.log("data", this.tableData)
    })
  }
  
  
  ngOnInit() {
    this.appService.updateCurrentModule('restock');
    this.loadLocationData();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      console.log("value:", this.filteredOptions);

    }

    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      console.log("filtered Value: ",  this.options.filter(option => option.toLowerCase().includes(filterValue)));
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }
}
