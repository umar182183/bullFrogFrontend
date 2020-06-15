import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/app/app.component';
import { AppRoutes } from './app.routes';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { SharedModule } from '../shared/shared.module';
import { LogineGuard } from './guards/login.guard';
import { DashboardGuard } from './guards/dashboard.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    NgbModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService, LogineGuard, DashboardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
