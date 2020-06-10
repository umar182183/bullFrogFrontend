import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { SharedPageNotFoundComponent } from '../shared/shared-page-not-found/shared-page-not-found.component';
// import {
//   AccountSettingsComponent,
//   CancelAccountComponent,
//   GeneralSettingsComponent,
//   ColorsLogoComponent,
//   GlobalExportComponent,
//   ArchivingComponent,
//   PlansBillingComponent
// } from '@projectModules/dashboard/settings/account-settings';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  
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
export class EmployeesRoutingModule {
}
