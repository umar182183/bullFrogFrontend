import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHomeComponent } from './components/home/home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [
    DashboardHomeComponent
  ],
  imports: [
    DashboardRoutingModule,
  ],
})
export class DashboardModule { }
