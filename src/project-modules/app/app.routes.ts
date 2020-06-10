import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { SharedPageNotFoundComponent } from '../shared/shared-page-not-found/shared-page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { LogineGuard } from './guards/login.guard';
import { DashboardGuard } from './guards/dashboard.guard';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LogineGuard]
  },
  {
    path:'dashboard',
    loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [DashboardGuard]
  },
  {
    path:'employees',
    loadChildren: () => import('../employees/employees.module').then(m => m.EmployeesModule)
  },
  {
    path:'customers',
    loadChildren: () => import('../customers/customers.module').then(m => m.CustomersModule)
  },
  {
    path:'users',
    loadChildren: () => import('../users/users.module').then(m => m.UsersModule)
  },
  {
    path:'campaigns',
    loadChildren: () => import('../campaigns/campaigns.module').then(m => m.CampaignsModule)
  },
  {
    path:'events',
    loadChildren: () => import('../events/events.module').then(m => m.EventsModule)
  },
  {
    path:'parts-sales',
    loadChildren: () => import('../parts-sales/parts-sales.module').then(m => m.PartsSalesModule)
  },
  {
    path:'reports',
    loadChildren: () => import('../reports/reports.module').then(m => m.ReporsModule)
  },
  {
    path:'spa-sales',
    loadChildren: () => import('../spa-sales/spa-sales.module').then(m => m.SpaSalesModule)
  },
  {
    path:'tech-support',
    loadChildren: () => import('../tech-support/tech-support.module').then(m => m.TechSupportModule)
  },
  { path: 'page_not_found', component: SharedPageNotFoundComponent },
  {
    path: '**',
    redirectTo: 'page_not_found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutes { }
