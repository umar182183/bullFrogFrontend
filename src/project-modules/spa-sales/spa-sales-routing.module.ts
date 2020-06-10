import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { SharedPageNotFoundComponent } from '../shared/shared-page-not-found/shared-page-not-found.component';
import { SpaSalesHomeComponent } from './components/spa-sales-home/spa-sales-home.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: SpaSalesHomeComponent},
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
export class SpaSalesRoutingModule {
}
