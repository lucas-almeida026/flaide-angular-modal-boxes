import { FAMBInputBox } from './famb-input-box/famb-input-box.component';
import { NgModule } from '@angular/core';
import { FAMBAlertBox } from './famb-alert-box/famb-alert-box.component';
import { FAMBConfirmBox } from './famb-confirm-box/famb-confirm-box.component';


@NgModule({
  declarations: [FAMBAlertBox, FAMBConfirmBox, FAMBInputBox],
  imports: [
  ],
  exports: [FAMBAlertBox, FAMBConfirmBox, FAMBInputBox]
})
export class FAMBModule { }
