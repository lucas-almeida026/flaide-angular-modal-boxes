import { FAMBModule } from 'famb';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FAMBModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
