import { NgModule } from '@angular/core';
import { __IMPORTS, __DECLARATIONS } from './components.barrel';
import { SharedPageNotFoundComponent } from './shared-page-not-found/shared-page-not-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [__IMPORTS, RouterModule],
  declarations: [__DECLARATIONS, SharedPageNotFoundComponent, ],
  exports: [__DECLARATIONS,SharedPageNotFoundComponent, ],
})
export class SharedModule { }
