import { NgModule } from '@angular/core';
import { InventoryManagementHomeComponent } from './components/i-management-home/i-management-home.component';
import { InventoryManagementRoutingModule } from './i-management-home-routing.module';


@NgModule({
  declarations: [
    InventoryManagementHomeComponent
  ],
  imports: [
    InventoryManagementRoutingModule,
  ],
})
export class InventoryManagementModule { }
