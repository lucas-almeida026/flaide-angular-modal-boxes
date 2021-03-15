import { fambAlertBoxConfigProtocol } from './../modal-box-config.interface';
import { EventListenerRecorder, EventListenerRecorderProtocol } from '../globalEventRecorder';
import { Observable } from '../Observable';
import { fambDescription, fambHoverButton, fambButton, fambTitle, textAlign } from '../modal-box-global-style.interface';

const useIntraDictionary = (obj: Object, intra: Object) => {
  if(obj !== undefined){
    Object.entries(obj).forEach(e => {
      intra[e[0]](e[1])
    })
  }
}

export type alertEvents = 'hide' | 'close' | 'ok'

const dictionary = {
  width: (value: string | null) => document.getElementById('famb-alert-box').style.width = value || '90%',
  maxWidth: (value: string | null) => document.getElementById('famb-alert-box').style.maxWidth = value || '400px',
  minHeight: (value: string | null) => document.getElementById('famb-alert-box').style.minHeight = value || '200px',
  backgroundColor: (value: string | null) => document.getElementById('famb-alert-box').style.backgroundColor = value || 'white',
  border: (value: string | null) => document.getElementById('famb-alert-box').style.border = value || 'none',
  borderRadius: (value: string | null) => document.getElementById('famb-alert-box').style.borderRadius = value || '6px',
  title: (obj: fambTitle | null) => {
    const intraDictionary = {
      fontSize: (value: string | null) => document.getElementById('famb-alert-title').style.fontSize = value || '1.5rem',
      color: (value: string | null) => document.getElementById('famb-alert-title').style.color = value || '#181818',
      textAlign: (value: textAlign | null) => document.getElementById('famb-alert-title').style.textAlign = value || 'center',
    }
    useIntraDictionary(obj, intraDictionary)
  },
  description: (obj: fambDescription | null) => {
    const intraDictionary = {
      fontSize: (value: string | null) => document.getElementById('famb-alert-description').style.fontSize = value || '1.1rem',
      color: (value: string | null) => document.getElementById('famb-alert-description').style.color = value || '#3a3a3a',
      textAlign: (value: textAlign | 'justify' | null) => document.getElementById('famb-alert-description').style.textAlign = value || 'justify',
      minHeight: (value: string | null) => document.getElementById('famb-alert-description').style.minHeight = value || '40px',
    }
    useIntraDictionary(obj, intraDictionary)
  },
  okButton: (obj: fambButton | null) => {
    const intraDictionary = {
      width: (value: string | null) => document.getElementById('famb-alert-mainBtn').style.width = value || '100px',
      maxWidth: (value: string | null) => document.getElementById('famb-alert-mainBtn').style.maxWidth = value || '150px',
      padding: (value: string | null) => document.getElementById('famb-alert-mainBtn').style.padding = value || '12px 0px',
      fontSize: (value: string | null) => document.getElementById('famb-alert-mainBtn').style.fontSize = value || '1rem',
      color: (value: string | null) => document.getElementById('famb-alert-mainBtn').style.color = value || 'white',
      backgroundColor: (value: string | null) => document.getElementById('famb-alert-mainBtn').style.backgroundColor = value || '#0069ff',
      border: (value: string | null) => document.getElementById('famb-alert-mainBtn').style.border = value || 'none',
      borderRadius: (value: string | null) => document.getElementById('famb-alert-mainBtn').style.borderRadius = value || '6px',
      opacity: (value: string | null) => document.getElementById('famb-alert-mainBtn').style.opacity = value || '.8',
      hover: (obj: fambHoverButton | null) => {
        const previous = {
          color: document.getElementById('famb-alert-mainBtn').style.color,
          backgroundColor: document.getElementById('famb-alert-mainBtn').style.backgroundColor,
          opacity: document.getElementById('famb-alert-mainBtn').style.opacity,
        }
        document.getElementById('famb-alert-mainBtn').onmouseover = () => {
          document.getElementById('famb-alert-mainBtn').style.color = obj?.color
          document.getElementById('famb-alert-mainBtn').style.backgroundColor = obj?.backgroundColor
          document.getElementById('famb-alert-mainBtn').style.opacity = obj?.opacity
        }
        document.getElementById('famb-alert-mainBtn').onmouseleave = () => {
          document.getElementById('famb-alert-mainBtn').style.color = previous.color
          document.getElementById('famb-alert-mainBtn').style.backgroundColor = previous.backgroundColor
          document.getElementById('famb-alert-mainBtn').style.opacity = previous.opacity
        }
      }
    }
    useIntraDictionary(obj, intraDictionary)
  }
}

const defaultConfigs: fambAlertBoxConfigProtocol = {
  animationTime: 700,
  bgTransparencyRate: '.5',
  hideOnClickBackground: true
}

export class FAMBAlertBoxController {
  private configs: fambAlertBoxConfigProtocol
  private observer: Observable = new Observable()
  private globalEventRecorder: EventListenerRecorderProtocol = new EventListenerRecorder()

  config(_configs: fambAlertBoxConfigProtocol): void {
    this.configs = Object.keys(_configs).length > 0 ? { ...defaultConfigs, ..._configs } : { ...defaultConfigs }
    document.getElementById('famb-alert-bg').style.transition = `${this.configs.animationTime || 600}ms ease`
    document.getElementById('famb-alert-box').style.transition = `${this.configs.animationTime || 600}ms ease`
    if(this.configs.hideOnClickBackground || this.configs.hideOnClickBackground === undefined) document.getElementById('famb-alert-bg').onclick = () => this.hide()
    if(this.configs.alertBoxStyles !== undefined){
      Object.entries(this.configs.alertBoxStyles).forEach(e => {
        dictionary[e[0]](e[1])
      })
    }
  }

  show(title: string, description: string, buttons?: {ok: string}): Observable {
    if(this.configs === undefined) throw new Error('you must config this alert box first, use <FAMBAlertBoxController>.config()')
    document.getElementById('famb-alert-title').innerText = title
    document.getElementById('famb-alert-description').innerText = description
    document.getElementById('famb-alert-bg').style.display = 'flex'
    if(!this.globalEventRecorder.hasEventListener('id', 'click')){
      this.globalEventRecorder.registerEventListener('id', 'click')
      document.getElementById('famb-alert-mainBtn').addEventListener('click', () => this.observer.emit('ok'))
    }
    document.getElementById('famb-alert-mainBtn').innerText = buttons?.ok || 'OK'
    
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