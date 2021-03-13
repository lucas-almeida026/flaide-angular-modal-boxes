import { Component, OnInit } from '@angular/core';
import { FAMBAlertBoxController } from 'famb';

const alert = new FAMBAlertBoxController()

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  ngOnInit(): void {
    
  }

  showAlert(): void {
    alert.config({
      alertStyles: {
        backgroundColor: 'purple',
        title: {
          color: 'blue'
        },
        description: {
          color: 'yellow'
        },
        okButton: {
          backgroundColor: 'red',
          opacity: '.7',
          hover: {
            backgroundColor: 'blue',
            opacity: '1'
          }
        }
      }
    })
    alert.show('Teste título', 'teste description').on('ok', () => console.log('ok'))
  }
}
