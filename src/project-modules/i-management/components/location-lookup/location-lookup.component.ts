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
  public loading = true;
  public loader = false;
  constructor(private appService: AppService, private locationService: LocationLookupService){}
  
  myControl = new FormControl();
  options: string[] = ['57-1423', '65-2422', '61-1422', '65-1422', '59-1422'];
  filteredOptions: Observable<string[]>;

  loadLocationData(partNum)
  {
    this.loader = true;
    this.locationService.getLocationdata(partNum).subscribe((data: any) => {
      this.tableData =data;
      if (this.tableData.length !=0) {
      this.loading = false;
      this.loader = false
      }
      console.log("data", this.tableData)
    })
  }
  resetData()
  {
    this.tableData = [];
    this.loadLocationData("0");
  }
  
  ngOnInit() {
    this.appService.updateCurrentModule('restock');
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

    selectPartNum(partNum)
    {
      this.tableData = [];
      this.loadLocationData(partNum);
    }
}
