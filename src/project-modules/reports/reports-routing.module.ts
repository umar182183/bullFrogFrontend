import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { SharedPageNotFoundComponent } from '../shared/shared-page-not-found/shared-page-not-found.component';
import { ReportsHomeComponent } from './components/reports-home/reports-home.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: ReportsHomeComponent},
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
export class ReportsRoutingModule {
}
