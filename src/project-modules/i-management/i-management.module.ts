import { NgModule } from '@angular/core';
import { InventoryManagementHomeComponent } from './components/i-management-home/i-management-home.component';
import { InventoryManagementRoutingModule } from './i-management-home-routing.module';
import { RestockPointsComponent } from './components/restock-points/restock-points.component';
import { LocationLookupComponent } from './components/location-lookup/location-lookup.component';
import { ManageLocationsComponent } from './components/manage-locations/manage-locations.component';
import { RelocateInventoryComponent } from './components/relocate-inventory/relocate-inventory.component';
import { ReorderPointsComponent } from './components/reorder-points/reorder-points.component';
import { InventoryCountsComponent } from './components/inventory-counts/inventory-counts.component';
import { InventoryManagementHeaderComponent } from './components/i-management-header/i-management-header.component';
import {CommonModule} from "@angular/common"
import { InventoryBreadCrumbComponent } from './components/inventory-bread-crumb/inventory-bread-crumb.component';
import { StockInventoryComponent } from './components/stock-inventory/stock-inventory.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LocationLookupService } from './services/location-lookup.service';
import { RestockService } from './services/restock.service';
import { StockInventoryService } from './services/stock-inventory.service';
import { ReorderPointsService } from './services/reorder-points.service';
import { RelocateService } from './services/relocate.service';
import { ManageLocationService } from './services/manage-location.service';
import { InventoryCountsService } from './services/inventory-counts.service';
import {AccordionModule} from 'primeng/accordion';
import {TableModule} from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { AreaManagementComponent } from './components/area-management/area-management.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    InventoryManagementHomeComponent,
    RestockPointsComponent,
    LocationLookupComponent,
    ManageLocationsComponent,
    RelocateInventoryComponent,
    ReorderPointsComponent,
    InventoryCountsComponent,
    InventoryManagementHeaderComponent,
    InventoryBreadCrumbComponent,
    StockInventoryComponent,
    AreaManagementComponent
  ],
  imports: [
    InventoryManagementRoutingModule,
    CommonModule,
    HttpClientModule,
    MatAutocompleteModule,
    FormsModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    ModalModule.forRoot(),
    AccordionModule,
    TableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    CarouselModule,
    ToastrModule.forRoot(), // ToastrModule added

  ],

  exports: [MatTableModule, MatPaginatorModule],

  providers: [LocationLookupService, RestockService, StockInventoryService, ReorderPointsService, RelocateService, ManageLocationService, InventoryCountsService,]

})
export class InventoryManagementModule { }
