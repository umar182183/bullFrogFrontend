import { NgModule } from '@angular/core';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersHomeComponent } from './components/customers-home/customers-home.component';


@NgModule({
  declarations: [
    CustomersHomeComponent
  ],
  imports: [
    CustomersRoutingModule
  ],
})
export class CustomersModule { }
