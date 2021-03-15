import { Component, OnInit } from '@angular/core';
import { FAMBAlertBoxController, FAMBConfirmBoxController, FAMBInputBoxController } from 'famb';

const alert = new FAMBAlertBoxController()
const confirm = new FAMBConfirmBoxController()
const input = new FAMBInputBoxController()

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
    const observable = confirm.show('Teste título', 'teste question')
    observable.on('ok', () => console.log('ok'))
    observable.on('cancel', () => console.log('cancel'))
  }

  showInput(): void {
    input.config({})
    const observable = input.show('asd', 'asd')
    observable.on('send', (e) => console.log('input close', e))
  }
}
