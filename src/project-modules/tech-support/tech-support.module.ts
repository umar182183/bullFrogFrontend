import { NgModule } from '@angular/core';
import { TechSupportHomeComponent } from './components/tech-support-home/tech-support-home.component';
import { TechSupportRoutingModule } from './tech-support-routing.module';


@NgModule({
  declarations: [
    TechSupportHomeComponent
  ],
  imports: [
    TechSupportRoutingModule,
  ],
})
export class TechSupportModule { }
