import { ProgressBoxComponent } from './components/progress-box/progress-box.component';
import { InputBoxComponent } from './components/input-box/input-box.component';
import { ConfirmBoxComponent } from './components/confirm-box/confirm-box.component';
import { AlertBoxComponent } from './components/alert-box/alert-box.component';
import { NgModule } from '@angular/core';
import { GlobalComponent } from './global/global.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    GlobalComponent, 
    AlertBoxComponent, 
    ConfirmBoxComponent, 
    InputBoxComponent, 
    ProgressBoxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GlobalComponent, 
    AlertBoxComponent, 
    ConfirmBoxComponent, 
    InputBoxComponent, 
    ProgressBoxComponent
  ]
})
export class FAMBModule { }
