import { fambConfirmBoxConfigProtocol } from './../modal-box-config.interface';
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

export type confirmEvents = 'hide' | 'close' | 'cancel' | 'ok'

const dictionary = {
  width: (value: string | null) => document.getElementById('famb-confirm-box').style.width = value || '90%',
  maxWidth: (value: string | null) => document.getElementById('famb-confirm-box').style.maxWidth = value || '400px',
  minHeight: (value: string | null) => document.getElementById('famb-confirm-box').style.minHeight = value || '200px',
  backgroundColor: (value: string | null) => document.getElementById('famb-confirm-box').style.backgroundColor = value || 'white',
  border: (value: string | null) => document.getElementById('famb-confirm-box').style.border = value || 'none',
  borderRadius: (value: string | null) => document.getElementById('famb-confirm-box').style.borderRadius = value || '6px',
  title: (obj: fambTitle | null) => {
    const intraDictionary = {
      fontSize: (value: string | null) => document.getElementById('famb-confirm-title').style.fontSize = value || '1.5rem',
      color: (value: string | null) => document.getElementById('famb-confirm-title').style.color = value || '#181818',
      textAlign: (value: textAlign | null) => document.getElementById('famb-confirm-title').style.textAlign = value || 'center',
    }
    useIntraDictionary(obj, intraDictionary)
  },
  description: (obj: fambDescription | null) => {
    const intraDictionary = {
      fontSize: (value: string | null) => document.getElementById('famb-confirm-description').style.fontSize = value || '1.1rem',
      color: (value: string | null) => document.getElementById('famb-confirm-description').style.color = value || '#3a3a3a',
      textAlign: (value: textAlign | 'justify' | null) => document.getElementById('famb-confirm-description').style.textAlign = value || 'justify',
      minHeight: (value: string | null) => document.getElementById('famb-confirm-description').style.minHeight = value || '40px',
    }
    useIntraDictionary(obj, intraDictionary)
  },
  okButton: (obj: fambButton | null) => {
    const intraDictionary = {
      width: (value: string | null) => document.getElementById('famb-confirm-mainBtn').style.width = value || '100px',
      maxWidth: (value: string | null) => document.getElementById('famb-confirm-mainBtn').style.maxWidth = value || '150px',
      padding: (value: string | null) => document.getElementById('famb-confirm-mainBtn').style.padding = value || '12px 0px',
      fontSize: (value: string | null) => document.getElementById('famb-confirm-mainBtn').style.fontSize = value || '1rem',
      color: (value: string | null) => document.getElementById('famb-confirm-mainBtn').style.color = value || 'white',
      backgroundColor: (value: string | null) => document.getElementById('famb-confirm-mainBtn').style.backgroundColor = value || '#0069ff',
      border: (value: string | null) => document.getElementById('famb-confirm-mainBtn').style.border = value || 'none',
      borderRadius: (value: string | null) => document.getElementById('famb-confirm-mainBtn').style.borderRadius = value || '6px',
      opacity: (value: string | null) => document.getElementById('famb-confirm-mainBtn').style.opacity = value || '.8',
      hover: (obj: fambHoverButton | null) => {
        const previous = {
          color: document.getElementById('famb-confirm-mainBtn').style.color,
          backgroundColor: document.getElementById('famb-confirm-mainBtn').style.backgroundColor,
          opacity: document.getElementById('famb-confirm-mainBtn').style.opacity,
        }
        document.getElementById('famb-confirm-mainBtn').onmouseover = () => {
          document.getElementById('famb-confirm-mainBtn').style.color = obj?.color
          document.getElementById('famb-confirm-mainBtn').style.backgroundColor = obj?.backgroundColor
          document.getElementById('famb-confirm-mainBtn').style.opacity = obj?.opacity
        }
        document.getElementById('famb-confirm-mainBtn').onmouseleave = () => {
          document.getElementById('famb-confirm-mainBtn').style.color = previous.color
          document.getElementById('famb-confirm-mainBtn').style.backgroundColor = previous.backgroundColor
          document.getElementById('famb-confirm-mainBtn').style.opacity = previous.opacity
        }
      }
    }
    useIntraDictionary(obj, intraDictionary)
  },
  cancelButton: (obj: fambButton | null) => {
    const intraDictionary = {
      width: (value: string | null) => document.getElementById('famb-confirm-secBtn').style.width = value || '100px',
      maxWidth: (value: string | null) => document.getElementById('famb-confirm-secBtn').style.maxWidth = value || '150px',
      padding: (value: string | null) => document.getElementById('famb-confirm-secBtn').style.padding = value || '12px 0px',
      fontSize: (value: string | null) => document.getElementById('famb-confirm-secBtn').style.fontSize = value || '1rem',
      color: (value: string | null) => document.getElementById('famb-confirm-secBtn').style.color = value || 'white',
      backgroundColor: (value: string | null) => document.getElementById('famb-confirm-secBtn').style.backgroundColor = value || '#0069ff',
      border: (value: string | null) => document.getElementById('famb-confirm-secBtn').style.border = value || 'none',
      borderRadius: (value: string | null) => document.getElementById('famb-confirm-secBtn').style.borderRadius = value || '6px',
      opacity: (value: string | null) => document.getElementById('famb-confirm-secBtn').style.opacity = value || '.8',
      hover: (obj: fambHoverButton | null) => {
        const previous = {
          color: document.getElementById('famb-confirm-secBtn').style.color,
          backgroundColor: document.getElementById('famb-confirm-secBtn').style.backgroundColor,
          opacity: document.getElementById('famb-confirm-secBtn').style.opacity,
        }
        document.getElementById('famb-confirm-secBtn').onmouseover = () => {
          document.getElementById('famb-confirm-secBtn').style.color = obj?.color
          document.getElementById('famb-confirm-secBtn').style.backgroundColor = obj?.backgroundColor
          document.getElementById('famb-confirm-secBtn').style.opacity = obj?.opacity
        }
        document.getElementById('famb-confirm-secBtn').onmouseleave = () => {
          document.getElementById('famb-confirm-secBtn').style.color = previous.color
          document.getElementById('famb-confirm-secBtn').style.backgroundColor = previous.backgroundColor
          document.getElementById('famb-confirm-secBtn').style.opacity = previous.opacity
        }
      }
    }
    useIntraDictionary(obj, intraDictionary)
  }
}

const defaultConfigs: fambConfirmBoxConfigProtocol = {
  animationTime: 700,
  bgTransparencyRate: '.5',
  hideOnClickBackground: false
}

export class FAMBConfirmBoxController {
  private configs: fambConfirmBoxConfigProtocol
  private observer: Observable = new Observable()
  private globalEventRecorder: EventListenerRecorderProtocol = new EventListenerRecorder()

  config(_configs: fambConfirmBoxConfigProtocol): void {
    if(!document.getElementById('famb-confirm-bg')) throw new Error('Can not config an elementRef that does not exist, make sure your HTML has a tag "<famb-confirm-box>"')
    this.configs = Object.keys(_configs).length > 0 ? { ...defaultConfigs, ..._configs } : { ...defaultConfigs }    
    document.getElementById('famb-confirm-bg').style.transition = `${this.configs.animationTime || 600}ms ease`
    document.getElementById('famb-confirm-box').style.transition = `${this.configs.animationTime || 600}ms ease`
    if(this.configs.hideOnClickBackground || this.configs.hideOnClickBackground === undefined) document.getElementById('famb-confirm-bg').onclick = () => this.hide()
    if(this.configs.confirmBoxStyles !== undefined){
      Object.entries(this.configs.confirmBoxStyles).forEach(e => {
        dictionary[e[0]](e[1])
      })
    }
  }

  show(title: string, question: string, buttons?: {ok: string, cancel: string}): Observable {
    if(this.configs === undefined) throw new Error('You must config this confirm box first, use <FAMBConfigBoxController>.config()')
    document.getElementById('famb-confirm-title').innerText = title
    document.getElementById('famb-confirm-description').innerText = question
    document.getElementById('famb-confirm-bg').style.display = 'flex'
    if(!this.globalEventRecorder.hasEventListener('main', 'click')){
      this.globalEventRecorder.registerEventListener('main', 'click')
      document.getElementById('famb-confirm-mainBtn').addEventListener('click', () => {
        this.observer.emit('ok')
        this.hide()
      })
    }
    if(!this.globalEventRecorder.hasEventListener('sec', 'click')){
      this.globalEventRecorder.registerEventListener('sec', 'click')
      document.getElementById('famb-confirm-secBtn').addEventListener('click', () => {
        this.observer.emit('cancel')
        this.hide()
      })
    }
    document.getElementById('famb-confirm-mainBtn').innerText = buttons?.ok || 'OK'
    document.getElementById('famb-confirm-secBtn').innerText = buttons?.cancel || 'Cancel'
    
    setTimeout(() => {
      document.getElementById('famb-confirm-bg').style.zIndex = '1'
      document.getElementById('famb-confirm-bg').style.backgroundColor = `rgba(0, 0, 0, .7)`
      document.getElementById('famb-confirm-box').style.transform = 'translateY(0px)'
      document.getElementById('famb-confirm-box').style.opacity = '1'
    }, 10)
    return this.observer
  }

  hide(): void {
    document.getElementById('famb-confirm-bg').style.backgroundColor = `rgba(0, 0, 0, 0)`
    document.getElementById('famb-confirm-box').style.transform = 'translateY(-100%)'
    document.getElementById('famb-confirm-box').style.opacity = '0'
    document.getElementById('famb-confirm-bg').style.zIndex = '-1'
    setTimeout(() => {
      document.getElementById('famb-confirm-bg').style.display = 'none'
      this.observer.emit('hide')
    }, this.configs.animationTime || 600)
    this.observer.emit('close')
  }
}