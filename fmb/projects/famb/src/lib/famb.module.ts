import { FAMBProgressBox } from './famb-progress-box/famb-progress-box.component';
import { FAMBInputBox } from './famb-input-box/famb-input-box.component';
import { NgModule } from '@angular/core';
import { FAMBAlertBox } from './famb-alert-box/famb-alert-box.component';
import { FAMBConfirmBox } from './famb-confirm-box/famb-confirm-box.component';


@NgModule({
  declarations: [FAMBAlertBox, FAMBConfirmBox, FAMBInputBox, FAMBProgressBox],
  imports: [
  ],
  exports: [FAMBAlertBox, FAMBConfirmBox, FAMBInputBox, FAMBProgressBox]
})
export class FAMBModule { }
