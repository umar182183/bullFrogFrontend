import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car.model';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'manage-locations',
  templateUrl: './manage-locations.component.html',
  styleUrls: ['./manage-locations.component.css']
})
export class ManageLocationsComponent implements OnInit {
  
  
  constructor(private appService: AppService, private carService: CarService){}
  
 public datasource :[
    {"brand": "Volkswagen", "year": 2012, "color": "White", "vin": "dsad231ff"},
    {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
    {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr"},
    {"brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh"},
    {"brand": "Mercedes", "year": 1995, "color": "White", "vin": "hrtwy34"},
    {"brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj"},
    {"brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr"},
    {"brand": "Jaguar", "year": 2013, "color": "White", "vin": "greg34"},
    {"brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5"},
    {"brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s"}
];

    cars: Car[];

    totalRecords: number;

    cols: any[];

    loading: boolean;


    ngOnInit() {
    this.appService.updateCurrentModule('restock');

    // this.totalRecords = this.datasource.length;
    this.totalRecords = 12;

      this.cols = [
          { field: 'vin', header: 'Vin' },
          { field: 'year', header: 'Year' },
          { field: 'brand', header: 'Brand' },
          { field: 'color', header: 'Color' }
      ];

      this.loading = true;
    }

    loadCarsLazy(event: LazyLoadEvent) {
      this.loading = true;

      //in a real application, make a remote request to load data using state metadata from event
      //event.first = First row offset
      //event.rows = Number of rows per page
      //event.sortField = Field name to sort with
      //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
      //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

      //imitate db connection over a network
      setTimeout(() => {
          if (this.datasource) {
              this.cars = this.datasource.slice(event.first, (event.first + event.rows));
              this.loading = false;
          }
      }, 1000);
  }
}