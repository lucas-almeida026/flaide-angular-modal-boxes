import { FAMB } from 'famb';
import { AfterViewInit, Component, OnInit } from '@angular/core';
// import { FAMBAlertBoxController, FAMBConfirmBoxController, FAMBInputBoxController, FAMBProgressBoxController } from 'famb';

// const alert = new FAMBAlertBoxController()
// const confirm = new FAMBConfirmBoxController()
// const input = new FAMBInputBoxController()
// const progress = new FAMBProgressBoxController()

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(private FAMB: FAMB){
  }
  
  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    let value = 0   
    this.FAMB.progress.show('testing progress bar')
    setInterval(() => {
      this.FAMB.progress.update(value)
      value += 10
    }, 500)
  }

  // showAlert(): void {
  //   alert.config({})
  //   alert.show('Teste título 4', 'teste description').on('ok', () => console.log('ok'))
  // }

  // showConfirm(): void {
  //   confirm.config({})
  //   const observable = confirm.show('Teste título', 'teste question')
  //   observable.on('ok', () => console.log('ok'))
  //   observable.on('cancel', () => console.log('cancel'))
  // }

  // showInput(): void {
  //   input.config({})
  //   const observable = input.show('asd', 'asd')
  //   observable.on('send', (e) => console.log('input close', e))
  // }

  // showProgress(): void {
  //   progress.config({})
  //   const obsbl = progress.show('Carregando')
  //   let v = 0
  //   const interval = setInterval(() => {
  //     progress.update(v+=10)
  //     if(v>=100) clearInterval(interval)
  //   }, 500)
  //   obsbl.on('finish', () => console.log('finish'))
  //   obsbl.on('secPlan', () => console.log('secPlan'))
  // }
}
