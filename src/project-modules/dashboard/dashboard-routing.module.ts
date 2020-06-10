import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { SharedPageNotFoundComponent } from '../shared/shared-page-not-found/shared-page-not-found.component';
import { DashboardHomeComponent } from './components/home/home.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: DashboardHomeComponent},
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
export class DashboardRoutingModule {
}
