import { Component, OnInit } from '@angular/core';
import { FAMBAlertBoxController, FAMBConfirmBoxController } from 'famb';

const alert = new FAMBAlertBoxController()
const confirm = new FAMBConfirmBoxController()

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  ngOnInit(): void {
    
  }

  showAlert(): void {
    alert.config({})
    alert.show('Teste título 4', 'teste description').on('ok', () => console.log('ok'))
  }

  showConfirm(): void {
    confirm.config({})
    const obsvb = confirm.show('Teste título', 'teste question')
    obsvb.on('ok', () => console.log('ok'))
    obsvb.on('cancel', () => console.log('cancel'))
  }
}
