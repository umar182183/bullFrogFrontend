import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/project-modules/app/services/app.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'manage-locations',
  templateUrl: './manage-locations.component.html',
  styleUrls: ['./manage-locations.component.css']
})
export class ManageLocationsComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('cnfrmtnModal', { static: false }) cnfrmtnModal: ModalDirective;

  public buildMange: boolean= true;
  public isFirstTable: boolean= false;
  public isLocation: boolean= false;

  constructor(private appService: AppService){}
 
  displayedColumns: string[] = ['id', 'name', 'action'];


    ngOnInit() {
    this.appService.updateCurrentModule('restock');
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    }

    
}

/* Static data */ 

export interface PeriodicElement {
  id: number;
  name: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'Avondale', action: "Delete"},
  { id: 2, name: 'Bluffdale', action: "Delete" },
  { id: 3, name: 'Boise', action: "Delete"},
  { id: 4, name: 'Gilbert', action: "Delete"},
  { id: 5, name: 'Glendale', action: "Delete"},
  { id: 6, name: 'Henderson',  action: "Delete"},
  { id: 7, name: 'Herriman',  action: "Delete"},
  { id: 8, name: 'Idaho Falls', action: "Delete"},
  { id: 9, name: 'Fluorine',  action: "Delete"},
  { id: 10, name: 'Offsite',  action: "Delete"},
];