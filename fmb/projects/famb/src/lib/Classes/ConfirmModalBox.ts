import { EventListenerRecorder } from "../Utils/EventListenerRecorder";
import { ConfirmEvents, ConfirmOptions, FAMBAllModalBoxesConfig, IConfirmModal, IReturnableObservable } from "../Utils/FAMB.type";
import { Observable } from "../Utils/Observable";
import ObjectEntries from '../Utils/ObjectEntries.js'
// import ObjectEntries from '../Utils/ObjectEntries.js'

export class ConfirmModalBox implements IConfirmModal{
  private observable = new Observable<ConfirmEvents>();
  private globalEventRecorder = new EventListenerRecorder()
  private configs!: FAMBAllModalBoxesConfig
  private configured = false

  constructor(_configs: FAMBAllModalBoxesConfig){
    this.configs = _configs
  }

  private config(){
    if(!document.getElementById('famb-confirm-bg')) throw new Error('Can not config an elementRef that does not exist, make sure your HTML has one of the tags "<famb-global>" | "<famb-confirm-box>"')
    this.configured = true;
    (document.getElementById('famb-confirm-bg') as HTMLElement).style.transition = `background ${this.configs.animationTime}ms ease`;
    (document.getElementById('famb-confirm-box') as HTMLElement).style.transition = `${this.configs.animationTime}ms ease`;
    if(!this.globalEventRecorder.hasEventListener('main', 'click')){
      this.globalEventRecorder.registerEventListener('main', 'click');
      (document.getElementById('famb-confirm-okButton') as HTMLElement).addEventListener('click', () => {;
        this.observable.emit('ok')
        this.hide()
      })
    }
    if(!this.globalEventRecorder.hasEventListener('sec', 'click')){
      this.globalEventRecorder.registerEventListener('sec', 'click');
      (document.getElementById('famb-confirm-cancelButton') as HTMLElement).addEventListener('click', () => {;
        this.observable.emit('cancel')
        this.hide()
      })
    }
    if(this.configs.hideOnClickBackground){
      (document.getElementById('famb-confirm-bg') as HTMLElement).onclick = () => this.hide()
    }
    ObjectEntries(this.configs.styles).forEach(element => {
      this.applyStylesFromConfig(`famb-confirm-${element[0]}`, element[1])
    })
  }

  private applyStylesFromConfig(id, styles){
    Object.entries(styles)
      .forEach(style => (document.getElementById(id) as HTMLElement).style[style[0]] = style[1])
  }

  show(title: string, question: string, options?: ConfirmOptions){
    if(!this.configured) this.config();
    (document.getElementById('famb-confirm-title') as HTMLElement).innerText = title;
    (document.getElementById('famb-confirm-description') as HTMLElement).innerText = question;
    (document.getElementById('famb-confirm-bg') as HTMLElement).style.display = 'flex';
    (document.getElementById('famb-confirm-okButton') as HTMLElement).innerText = options?.okButtonText || 'OK';
    (document.getElementById('famb-confirm-cancelButton') as HTMLElement).innerText = options?.cancelButtonText || 'Cancel';
    
    setTimeout(() => {
      (document.getElementById('famb-confirm-bg') as HTMLElement).style.zIndex = '99';
      (document.getElementById('famb-confirm-bg') as HTMLElement).style.backgroundColor = `rgba(0, 0, 0, .7)`;
      (document.getElementById('famb-confirm-box') as HTMLElement).style.transform = 'translateY(0px)';
      (document.getElementById('famb-confirm-box') as HTMLElement).style.opacity = '1';
    }, 10)
    let returnable: IReturnableObservable<ConfirmEvents> = this.observable
    return returnable
  }

  hide(){
    (document.getElementById('famb-confirm-bg') as HTMLElement).style.backgroundColor = `rgba(0, 0, 0, 0)`;
    (document.getElementById('famb-confirm-box') as HTMLElement).style.transform = 'translateY(-100%)';
    (document.getElementById('famb-confirm-box') as HTMLElement).style.opacity = '0';
    (document.getElementById('famb-confirm-bg') as HTMLElement).style.zIndex = '-1';
    setTimeout(() => {
      (document.getElementById('famb-confirm-bg') as HTMLElement).style.display = 'none';
      this.observable.emit('hide')
    }, this.configs.animationTime)
    this.observable.emit('close')
  }
}