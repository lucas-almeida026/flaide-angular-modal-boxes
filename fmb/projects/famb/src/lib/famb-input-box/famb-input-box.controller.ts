import { fambInputInput } from './famb-input-styles.interface';
import { fambInputBoxConfigProtocol } from './../modal-box-config.interface';
import { EventListenerRecorderProtocol, EventListenerRecorder } from "../globalEventRecorder"
import { fambButton, fambDescription, fambHoverButton, fambTitle, textAlign } from "../modal-box-global-style.interface"
import { Observable } from "../Observable"

const useIntraDictionary = (obj: Object, intra: Object) => {
  if(obj !== undefined){
    Object.entries(obj).forEach(e => {
      intra[e[0]](e[1])
    })
  }
}

export type inputEvents = 'hide' | 'close' | 'send' | 'keyup' | 'keypress' | 'keydown'

const dictionary = {
  width: (value: string | null) => document.getElementById('famb-input-box').style.width = value || '90%',
  maxWidth: (value: string | null) => document.getElementById('famb-input-box').style.maxWidth = value || '400px',
  minHeight: (value: string | null) => document.getElementById('famb-input-box').style.minHeight = value || '200px',
  backgroundColor: (value: string | null) => document.getElementById('famb-input-box').style.backgroundColor = value || 'white',
  border: (value: string | null) => document.getElementById('famb-input-box').style.border = value || 'none',
  borderRadius: (value: string | null) => document.getElementById('famb-input-box').style.borderRadius = value || '6px',
  title: (obj: fambTitle | null) => {
    const intraDictionary = {
      fontSize: (value: string | null) => document.getElementById('famb-input-title').style.fontSize = value || '1.5rem',
      color: (value: string | null) => document.getElementById('famb-input-title').style.color = value || '#181818',
      textAlign: (value: textAlign | null) => document.getElementById('famb-input-title').style.textAlign = value || 'center',
    }
    useIntraDictionary(obj, intraDictionary)
  },
  question: (obj: fambDescription | null) => {
    const intraDictionary = {
      fontSize: (value: string | null) => document.getElementById('famb-input-description').style.fontSize = value || '1.1rem',
      color: (value: string | null) => document.getElementById('famb-input-description').style.color = value || '#3a3a3a',
      textAlign: (value: textAlign | 'justify' | null) => document.getElementById('famb-input-description').style.textAlign = value || 'justify',
      minHeight: (value: string | null) => document.getElementById('famb-input-description').style.minHeight = value || '40px',
    }
    useIntraDictionary(obj, intraDictionary)
  },
  sendButton: (obj: fambButton | null) => {
    const intraDictionary = {
      width: (value: string | null) => document.getElementById('famb-input-mainBtn').style.width = value || '100px',
      maxWidth: (value: string | null) => document.getElementById('famb-input-mainBtn').style.maxWidth = value || '150px',
      padding: (value: string | null) => document.getElementById('famb-input-mainBtn').style.padding = value || '12px 0px',
      fontSize: (value: string | null) => document.getElementById('famb-input-mainBtn').style.fontSize = value || '1rem',
      color: (value: string | null) => document.getElementById('famb-input-mainBtn').style.color = value || 'white',
      backgroundColor: (value: string | null) => document.getElementById('famb-input-mainBtn').style.backgroundColor = value || '#0069ff',
      border: (value: string | null) => document.getElementById('famb-input-mainBtn').style.border = value || 'none',
      borderRadius: (value: string | null) => document.getElementById('famb-input-mainBtn').style.borderRadius = value || '6px',
      opacity: (value: string | null) => document.getElementById('famb-input-mainBtn').style.opacity = value || '.8',
      hover: (obj: fambHoverButton | null) => {
        const previous = {
          color: document.getElementById('famb-input-mainBtn').style.color,
          backgroundColor: document.getElementById('famb-input-mainBtn').style.backgroundColor,
          opacity: document.getElementById('famb-input-mainBtn').style.opacity,
        }
        document.getElementById('famb-input-mainBtn').onmouseover = () => {
          document.getElementById('famb-input-mainBtn').style.color = obj?.color
          document.getElementById('famb-input-mainBtn').style.backgroundColor = obj?.backgroundColor
          document.getElementById('famb-input-mainBtn').style.opacity = obj?.opacity
        }
        document.getElementById('famb-input-mainBtn').onmouseleave = () => {
          document.getElementById('famb-input-mainBtn').style.color = previous.color
          document.getElementById('famb-input-mainBtn').style.backgroundColor = previous.backgroundColor
          document.getElementById('famb-input-mainBtn').style.opacity = previous.opacity
        }
      }
    }
    useIntraDictionary(obj, intraDictionary)
  },
  input: (obj: fambInputInput | null) => {
    const intraDictionary = {
      width: (value: string | null) => document.getElementById('famb-input-input-input').style.width = value || '100%',
      maxWidth: (value: string | null) => document.getElementById('famb-input-input-input').style.maxWidth = value || '450px',
      padding: (value: string | null) => document.getElementById('famb-input-input-input').style.padding = value || '2px 8px',
      fontSize: (value: string | null) => document.getElementById('famb-input-input-input').style.fontSize = value || '1.1rem',
      color: (value: string | null) => document.getElementById('famb-input-input-input').style.color = value || '#343434',
      border: (value: string | null) => document.getElementById('famb-input-input-input').style.border = value || '2px solid #0069ff',
      borderRadius: (value: string | null) => document.getElementById('famb-input-input-input').style.borderRadius = value || '6px',
      placeholderText: (value: string | null) => document.getElementById('famb-input-input-input')['placeholder'] = value || 'Your answer',
    }
    useIntraDictionary(obj, intraDictionary)
  }
}

const defaultConfigs: fambInputBoxConfigProtocol = {
  animationTime: 700,
  bgTransparencyRate: '.5',
  hideOnClickBackground: false
}

export class FAMBInputBoxController {
  private configs: fambInputBoxConfigProtocol
  private observer: Observable = new Observable()
  private globalEventRecorder: EventListenerRecorderProtocol = new EventListenerRecorder()

  config(_configs: fambInputBoxConfigProtocol): void {
    if(!document.getElementById('famb-input-bg')) throw new Error('Can not config an elementRef that does not exist, make sure your HTML has a tag "<famb-input-box>"')
    this.configs = Object.keys(_configs).length > 0 ? { ...defaultConfigs, ..._configs } : { ...defaultConfigs }    
    document.getElementById('famb-input-bg').style.transition = `${this.configs.animationTime || 600}ms ease`
    document.getElementById('famb-input-box').style.transition = `${this.configs.animationTime || 600}ms ease`
    if(this.configs.hideOnClickBackground || this.configs.hideOnClickBackground === undefined) document.getElementById('famb-input-bg').onclick = () => this.hide()
    if(this.configs.inputBoxStyles !== undefined){
      Object.entries(this.configs.inputBoxStyles).forEach(e => {
        dictionary[e[0]](e[1])
      })
    }
  }

  show(title: string, question: string, buttons?: {send: string}): Observable {
    if(this.configs === undefined) throw new Error('You must config this input box first, use <FAMBInputBoxController>.config()')
    document.getElementById('famb-input-input-input')['value'] = ''
    document.getElementById('famb-input-title').innerText = title
    document.getElementById('famb-input-description').innerText = question
    document.getElementById('famb-input-bg').style.display = 'flex'
    if(!this.globalEventRecorder.hasEventListener('main', 'click')){
      this.globalEventRecorder.registerEventListener('main', 'click')
      document.getElementById('famb-input-mainBtn').addEventListener('click', () => {
        this.observer.emitValue('send', document.getElementById('famb-input-input-input')['value'])
        this.hide()
      })
    }
    if(!this.globalEventRecorder.hasEventListener('iKeyDown', 'click')){
      this.globalEventRecorder.registerEventListener('iKeyDown', 'click')
      document.getElementById('famb-input-input-input').addEventListener('keydown', (e) => this.observer.emitValue('keydown', e))
      document.getElementById('famb-input-input-input').addEventListener('keyup', (e) => this.observer.emitValue('keyup', e))
      document.getElementById('famb-input-input-input').addEventListener('keypress', (e) => this.observer.emitValue('keypress', e))
    }
    document.getElementById('famb-input-mainBtn').innerText = buttons?.send || 'Send'
    setTimeout(() => {
      document.getElementById('famb-input-bg').style.zIndex = '1'
      document.getElementById('famb-input-bg').style.backgroundColor = `rgba(0, 0, 0, .7)`
      document.getElementById('famb-input-box').style.transform = 'translateY(0px)'
      document.getElementById('famb-input-box').style.opacity = '1'
    }, 10)
    return this.observer
  }

  hide(): void {
    document.getElementById('famb-input-bg').style.backgroundColor = `rgba(0, 0, 0, 0)`
    document.getElementById('famb-input-box').style.transform = 'translateY(-100%)'
    document.getElementById('famb-input-box').style.opacity = '0'
    document.getElementById('famb-input-bg').style.zIndex = '-1'
    setTimeout(() => {
      document.getElementById('famb-input-bg').style.display = 'none'
      this.observer.emit('hide')
    }, this.configs.animationTime || 600)
    this.observer.emit('close')
  }
}