import { NgModule } from '@angular/core';
import { EventsHomeComponent } from './components/events-home/events-home.component';
import { EventsRoutingModule } from './events-routing.module';


@NgModule({
  declarations: [
    EventsHomeComponent
  ],
  imports: [
    EventsRoutingModule,
  ],
})
export class EventsModule { }
