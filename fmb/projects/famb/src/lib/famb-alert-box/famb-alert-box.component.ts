import { AfterViewInit, Component } from "@angular/core";

const dictionary = {
  width: (value: string | null) => document.getElementById('famb-alert-box').style.width = value || '90%',
  maxWidth: (value: string | null) => document.getElementById('famb-alert-box').style.maxWidth = value || '400px',
  minHeight: (value: string | null) => document.getElementById('famb-alert-box').style.minHeight = value || '200px',
  backgroundColor: (value: string | null) => document.getElementById('famb-alert-box').style.backgroundColor = value || 'white',
  border: (value: string | null) => document.getElementById('famb-alert-box').style.border = value || 'none',
  borderRadius: (value: string | null) => document.getElementById('famb-alert-box').style.borderRadius = value || '6px',
}

@Component({
  selector: 'famb-alert-box',
  templateUrl: './famb-alert-box.component.html',
  styleUrls: ['./famb-alert-box.component.scss']
})
export class FAMBAlertBox implements AfterViewInit {
  
  ngAfterViewInit(): void {
    // if(this.hideOnClickBackground || this.hideOnClickBackground === undefined) document.getElementById('mbla-alert-bg').onclick = () => this.hide()
  }
}