import { AlertOptions, IReturnableObservable } from './../Utils/FAMB.type';
import { EventListenerRecorder } from "../Utils/EventListenerRecorder";
import { AlertEvents, FAMBAllModalBoxesConfig, IAlertModal } from "../Utils/FAMB.type";
import { Observable } from "../Utils/Observable";
import ObjectEntries from '../Utils/ObjectEntries.js'

export class AlertModalBox implements IAlertModal{

  private observable = new Observable<AlertEvents>();
  private globalEventRecorder = new EventListenerRecorder()
  private configs!: FAMBAllModalBoxesConfig
  private configured = false

  constructor(_configs: FAMBAllModalBoxesConfig){
    this.configs = _configs
  }

  private config(){
    if(!document.getElementById('famb-alert-bg')) throw new Error('Can not config an elementRef that does not exist, make sure your HTML has one of the tags "<famb-global>" | "<famb-alert-box>"')
    this.configured = true;    
    (document.getElementById('famb-alert-bg') as HTMLElement).style.transition = `background ${this.configs.animationTime}ms ease`;
    (document.getElementById('famb-alert-box') as HTMLElement).style.transition = `${this.configs.animationTime}ms ease`;
    (document.getElementById('famb-alert-okButton') as HTMLElement).onclick = () => this.hide();
    if(this.configs.hideOnClickBackground){
      setTimeout(
        () => (document.getElementById('famb-alert-bg') as HTMLElement).onclick = () => this.hide(), 
        (this.configs!.animationTime || 0) + 500 || 1000
      )
    }
    
    ObjectEntries(this.configs.styles).forEach(element => {
      this.applyStylesFromConfig(`famb-alert-${element[0]}`, element[1])
      // if(element[0] == 'box'){
      //   this.applyStylesFromConfig('famb-alert-box', element[1])
      // }else if(element[0] == 'title'){
      //   this.applyStylesFromConfig('famb-alert-title', element[1])
      // }else if(element[0] == 'description'){
      //   this.applyStylesFromConfig('famb-alert-description', element[1])
      // }else if(element[0] == 'title'){
      //   this.applyStylesFromConfig('famb-alert-title', element[1])
      // }else if(element[0] == 'mainBtn'){
      // }
    })
  }

  private applyStylesFromConfig(id, styles){
    Object.entries(styles)
      .forEach(style => (document.getElementById(id) as HTMLElement).style[style[0]] = style[1])
  }

  show(title: string, description: string, options?: AlertOptions){
    if(!this.configured) this.config();
    (document.getElementById('famb-alert-title') as HTMLElement).innerText = title;
    (document.getElementById('famb-alert-description') as HTMLElement).innerText = description;
    (document.getElementById('famb-alert-bg') as HTMLElement).style.display = 'flex';
    if(!this.globalEventRecorder.hasEventListener('id', 'click')){
      this.globalEventRecorder.registerEventListener('id', 'click');
      (document.getElementById('famb-alert-okButton') as HTMLElement).addEventListener('click', () => this.observable.emit('ok'))
    }
    (document.getElementById('famb-alert-okButton') as HTMLElement).innerText = options?.okButtonText || 'Ok';
    setTimeout(() => {
      (document.getElementById('famb-alert-bg') as HTMLElement).style.zIndex = '99';
      (document.getElementById('famb-alert-bg') as HTMLElement).style.backgroundColor = `rgba(0, 0, 0, .7)`;
      (document.getElementById('famb-alert-box') as HTMLElement).style.transform = 'translateY(0px)';
      (document.getElementById('famb-alert-box') as HTMLElement).style.opacity = '1';
    }, 10)
    let returnable: IReturnableObservable<AlertEvents> = this.observable
    return returnable
  }

  hide(){
    if(!this.configured) this.config();
    (document.getElementById('famb-alert-bg') as HTMLElement).style.backgroundColor = `rgba(0, 0, 0, 0)`;
    (document.getElementById('famb-alert-box') as HTMLElement).style.transform = 'translateY(-100%)';
    (document.getElementById('famb-alert-box') as HTMLElement).style.opacity = '0';
    (document.getElementById('famb-alert-bg') as HTMLElement).style.zIndex = '-1';
    setTimeout(() => {
      (document.getElementById('famb-alert-bg') as HTMLElement).style.display = 'none';
      this.observable?.emit('close')
    }, this.configs.animationTime)
    this.observable.emit('hide')
  }
}