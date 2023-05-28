import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShapeComponent } from './shape/shape.component';
import { HttpClientModule } from '@angular/common/http';

import { ButtonModule } from 'primeng/button'; 
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    AppComponent,
    ShapeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
