import { EventListenerRecorder, EventListenerRecorderProtocol } from '../globalEventRecorder';
import { Observer } from '../Observer';
import { fambModalBoxConfigProtocol } from './../modal-box-config.interface';

export type alertEvents = 'hide' | 'close' | 'ok'

const dictionary = {
  width: (value: string | null) => document.getElementById('famb-alert-box').style.width = value || '90%',
  maxWidth: (value: string | null) => document.getElementById('famb-alert-box').style.maxWidth = value || '400px',
  minHeight: (value: string | null) => document.getElementById('famb-alert-box').style.minHeight = value || '200px',
  backgroundColor: (value: string | null) => document.getElementById('famb-alert-box').style.backgroundColor = value || 'white',
  border: (value: string | null) => document.getElementById('famb-alert-box').style.border = value || 'none',
  borderRadius: (value: string | null) => document.getElementById('famb-alert-box').style.borderRadius = value || '6px',
}

const defaultConfigs: fambModalBoxConfigProtocol = {
  animationTime: 700,
  bgTransparencyRate: '.5',
  hideOnClickBackground: true
}

export class FAMBAlertBoxController {
  private configs: fambModalBoxConfigProtocol
  private observer: Observer = new Observer()
  private globalEventRecorder: EventListenerRecorderProtocol = new EventListenerRecorder()

  config(_configs: fambModalBoxConfigProtocol): void {
    this.configs = Object.keys(_configs).length > 0 ? { ..._configs, ...defaultConfigs } : { ...defaultConfigs }    
    document.getElementById('famb-alert-bg').style.transition = `${this.configs.animationTime || 600}ms ease`
    document.getElementById('famb-alert-box').style.transition = `${this.configs.animationTime || 600}ms ease`
    if(this.configs.hideOnClickBackground || this.configs.hideOnClickBackground === undefined) document.getElementById('famb-alert-bg').onclick = () => this.hide()
    if(this.configs.alertStyles !== undefined){
      Object.entries(this.configs.alertStyles).forEach(e => {
        dictionary[e[0]](e[1])
      })
    }
  }

  show(title: string, description: string): Observer {
    if(this.configs === undefined) throw new Error('you must config this alert box first, use <FAMBAlertBoxController>.config()')
    document.getElementById('famb-alert-title').innerText = title
    document.getElementById('famb-alert-description').innerText = description
    document.getElementById('famb-alert-bg').style.display = 'flex'
    if(!this.globalEventRecorder.hasEventListener('id', 'click')){
      this.globalEventRecorder.registerEventListener('id', 'click')
      document.getElementById('famb-alert-mainBtn').addEventListener('click', () => this.observer.emit('ok'))
    }
    
    setTimeout(() => {
      document.getElementById('famb-alert-bg').style.zIndex = '1'
      document.getElementById('famb-alert-bg').style.backgroundColor = `rgba(0, 0, 0, .7)`
      document.getElementById('famb-alert-box').style.transform = 'translateY(0px)'
      document.getElementById('famb-alert-box').style.opacity = '1'
    }, 10)
    return this.observer
  }

  hide(): void {
    document.getElementById('famb-alert-bg').style.backgroundColor = `rgba(0, 0, 0, 0)`
    document.getElementById('famb-alert-box').style.transform = 'translateY(-100%)'
    document.getElementById('famb-alert-box').style.opacity = '0'
    document.getElementById('famb-alert-bg').style.zIndex = '-1'
    setTimeout(() => {
      document.getElementById('famb-alert-bg').style.display = 'none'
      this.observer.emit('hide')
    }, this.configs.animationTime || 600)
    this.observer.emit('close')
  }
}