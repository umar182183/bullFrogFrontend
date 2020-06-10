// import { CommonModule } from '@angular/common'; // Todo: high, lets see if angular 8 works without it
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './components/app/app.component';


export const __IMPORTS = [
  BrowserModule,
  BrowserAnimationsModule,
  FormsModule,
  HttpClientModule,
  
];

export const __DECLARATIONS = [
  AppComponent, 
];

export const __PROVIDERS = [
  
]