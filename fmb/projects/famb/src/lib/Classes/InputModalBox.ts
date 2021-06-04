import { FAMBAllModalBoxesConfig, IInputModal, InputEvents, InputOptions, IReturnableObservable } from './../Utils/FAMB.type';
import { Observable } from "./../Utils/Observable";
import { EventListenerRecorder } from "./../Utils/EventListenerRecorder";
import ObjectEntries from './../Utils/ObjectEntries';

export class InputModalBox implements IInputModal{
  private observable = new Observable<InputEvents>();
  private globalEventRecorder = new EventListenerRecorder()
  private configs!: FAMBAllModalBoxesConfig
  private configured = false

  constructor(_configs: FAMBAllModalBoxesConfig){
    this.configs = _configs
  }

  private config(){
    (document.getElementById('famb-input-bg') as HTMLElement).style.transition = ` background ${this.configs.animationTime || 600}ms ease`;
    (document.getElementById('famb-input-box') as HTMLElement).style.transition = `${this.configs.animationTime || 600}ms ease`;
    if(!this.globalEventRecorder.hasEventListener('main', 'click')){
      this.globalEventRecorder.registerEventListener('main', 'click');
      (document.getElementById('famb-input-sendButton') as HTMLElement).addEventListener('click', () => {
        this.observable.emitValue('send', (document.getElementById('famb-input-input') as HTMLInputElement).value)
        this.hide()
      })
    }
    if(!this.globalEventRecorder.hasEventListener('iKeyDown', 'click')){
      this.globalEventRecorder.registerEventListener('iKeyDown', 'click');
      (document.getElementById('famb-input-input') as HTMLInputElement)
        .addEventListener('keydown', (e) => this.observable.emitValue('keydown', e));

      (document.getElementById('famb-input-input') as HTMLInputElement)
        .addEventListener('keyup', (e) => this.observable.emitValue('keyup', e));

      (document.getElementById('famb-input-input') as HTMLInputElement)
        .addEventListener('keypress', (e) => this.observable.emitValue('keypress', e));
    }
    if(this.configs.hideOnClickBackground){
      (document.getElementById('famb-input-bg') as HTMLElement).onclick = () => this.hide()
    }
    ObjectEntries(this.configs.styles).forEach(element => {
      this.applyStylesFromConfig(`famb-input-${element[0]}`, element[1])
    })
  }

  private applyStylesFromConfig(id, styles){
    Object.entries(styles)
      .forEach(style => (document.getElementById(id) as HTMLElement).style[style[0]] = style[1])
  }

  show(title: string, description: string, options?: InputOptions){
    if(!this.configured) this.config();    
    if(options?.pressingEnterClicksTheButton){
      (document.getElementById('famb-input-input') as HTMLInputElement).addEventListener('keypress', (e) => {
        if(e.keyCode === 13 || e.code === 'Enter'){
          (document.getElementById('famb-input-sendButton') as HTMLElement).click()
        }
      })
    }
    (document.getElementById('famb-input-input') as HTMLInputElement).value = '';
    (document.getElementById('famb-input-input') as HTMLInputElement).placeholder = options?.inputPlaceholder || 'Your answer...';
    (document.getElementById('famb-input-title') as HTMLElement).innerText = title;
    (document.getElementById('famb-input-description') as HTMLElement).innerText = description;
    (document.getElementById('famb-input-bg') as HTMLElement).style.display = 'flex';
    (document.getElementById('famb-input-sendButton') as HTMLElement).innerText = options?.sendButtonText || 'Send';
    setTimeout(() => {
      (document.getElementById('famb-input-input') as HTMLInputElement).focus();
      (document.getElementById('famb-input-bg') as HTMLElement).style.zIndex = '99';
      (document.getElementById('famb-input-bg') as HTMLElement).style.backgroundColor = `rgba(0, 0, 0, .7)`;
      (document.getElementById('famb-input-box') as HTMLElement).style.transform = 'translateY(0px)';
      (document.getElementById('famb-input-box') as HTMLElement).style.opacity = '1';
    }, 10)
    let returnable: IReturnableObservable<InputEvents> = this.observable
    return returnable
  }

  hide(){
    (document.getElementById('famb-input-bg') as HTMLElement).style.backgroundColor = `rgba(0, 0, 0, 0)`;
    (document.getElementById('famb-input-box') as HTMLElement).style.transform = 'translateY(-100%)';
    (document.getElementById('famb-input-box') as HTMLElement).style.opacity = '0';
    (document.getElementById('famb-input-bg') as HTMLElement).style.zIndex = '-1';
    setTimeout(() => {
      (document.getElementById('famb-input-bg') as HTMLElement).style.display = 'none';
      this.observable.emit('hide')
    }, this.configs.animationTime)
    this.observable.emit('close')
  }
}