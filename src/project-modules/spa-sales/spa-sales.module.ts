import { NgModule } from '@angular/core';
import { SpaSalesHomeComponent } from './components/spa-sales-home/spa-sales-home.component';
import { SpaSalesRoutingModule } from './spa-sales-routing.module';


@NgModule({
  declarations: [
    SpaSalesHomeComponent
  ],
  imports: [
    SpaSalesRoutingModule,
  ],
})
export class SpaSalesModule { }
