import { NgModule } from '@angular/core';
import { PartsSalesHomeComponent } from './components/parts-sales-home/parts-sales-home.component';
import { PartsSalesRoutingModule } from './parts-sales-routing.module';


@NgModule({
  declarations: [
    PartsSalesHomeComponent
  ],
  imports: [
    PartsSalesRoutingModule,
  ],
})
export class PartsSalesModule { }
