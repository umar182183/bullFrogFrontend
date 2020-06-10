import { NgModule } from '@angular/core';
import { CampaignsHomeComponent } from './components/campaigns-home/campaigns-home.component';
import { CampaignsRoutingModule } from './campaigns-routing.module';


@NgModule({
  declarations: [
    CampaignsHomeComponent
  ],
  imports: [
    CampaignsRoutingModule,
  ],
})
export class CampaignsModule { }
