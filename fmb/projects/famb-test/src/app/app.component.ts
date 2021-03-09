import { Component, OnInit } from '@angular/core';
import { FAMBAlertBoxController } from 'famb';

const test = new FAMBAlertBoxController()

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  ngOnInit(): void {
    
  }

  showAlert(): void {
    test.config({})
    test.show()
  }
}
