import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { SharedPageNotFoundComponent } from '../shared/shared-page-not-found/shared-page-not-found.component';
import { InventoryManagementHomeComponent } from './components/i-management-home/i-management-home.component';
import { RestockPointsComponent } from './components/restock-points/restock-points.component';
import { InventoryCountsComponent } from './components/inventory-counts/inventory-counts.component';
import { LocationLookupComponent } from './components/location-lookup/location-lookup.component';
import { ManageLocationsComponent } from './components/manage-locations/manage-locations.component';
import { RelocateInventoryComponent } from './components/relocate-inventory/relocate-inventory.component';
import { ReorderPointsComponent } from './components/reorder-points/reorder-points.component';
import { StockInventoryComponent } from './components/stock-inventory/stock-inventory.component';


const routes: Routes = [
  {path: '', component: InventoryManagementHomeComponent, children: [
    {path: 'restock-points', component: RestockPointsComponent},
    {path: 'inventory-counts', component: InventoryCountsComponent},
    {path: 'location-lookup', component: LocationLookupComponent},
    {path: 'manage-locations', component: ManageLocationsComponent},
    {path: 'relocate-inventory', component: RelocateInventoryComponent},
    {path: 'reorder-points', component: ReorderPointsComponent},
    {path: 'stock-inventory', component: StockInventoryComponent},
  ]},
  

  {path: 'page_not_found', component: SharedPageNotFoundComponent},
  {
    path: '**',
    redirectTo: 'page_not_found'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryManagementRoutingModule {
}
