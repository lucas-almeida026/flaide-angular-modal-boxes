import { NgModule } from '@angular/core';
import { FAMBAlertBox } from './famb-alert-box/famb-alert-box.component';
import { FAMBConfirmBox } from './famb-confirm-box/famb-confirm-box.component';


@NgModule({
  declarations: [FAMBAlertBox, FAMBConfirmBox],
  imports: [
  ],
  exports: [FAMBAlertBox, FAMBConfirmBox]
})
export class FAMBModule { }
