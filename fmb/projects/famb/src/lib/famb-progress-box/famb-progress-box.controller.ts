import { fambButton, fambHoverButton, textAlign } from './../modal-box-global-style.interface';
import { Observable } from './../Observable';
import { fambProgressBoxConfigProtocol } from "../modal-box-config.interface"
import { EventListenerRecorder, EventListenerRecorderProtocol } from '../globalEventRecorder';
import { fambTitle } from '../modal-box-global-style.interface';
import { fambProgressBar } from './famb-progress-box.interface';

const useIntraDictionary = (obj: Object, intra: Object) => {
  if(obj !== undefined){
    Object.entries(obj).forEach(e => {
      intra[e[0]](e[1])
    })
  }
}

export type progressEvents = 'hide' | 'close' | 'secPlan' | 'finish'

const dictionary = {
  width: (value: string | null) => document.getElementById('famb-progress-box').style.width = value || '90%',
  maxWidth: (value: string | null) => document.getElementById('famb-progress-box').style.maxWidth = value || '400px',
  minHeight: (value: string | null) => document.getElementById('famb-progress-box').style.minHeight = value || '200px',
  backgroundColor: (value: string | null) => document.getElementById('famb-progress-box').style.backgroundColor = value || 'white',
  border: (value: string | null) => document.getElementById('famb-progress-box').style.border = value || 'none',
  borderRadius: (value: string | null) => document.getElementById('famb-progress-box').style.borderRadius = value || '6px',
  title: (obj: fambTitle | null) => {
    const intraDictionary = {
      fontSize: (value: string | null) => document.getElementById('famb-progress-title').style.fontSize = value || '1.5rem',
      color: (value: string | null) => document.getElementById('famb-progress-title').style.color = value || '#181818',
      textAlign: (value: textAlign | null) => document.getElementById('famb-progress-title').style.textAlign = value || 'center',
    }
    useIntraDictionary(obj, intraDictionary)
  },
  progressBar: (obj: fambProgressBar | null) => {
    const intraDictionary = {
      width: (value: string | null) => document.getElementById('famb-progress-bar').style.width = value || '90%',
      maxWidth: (value: string | null) => document.getElementById('famb-progress-bar').style.maxWidth = value || '400px',
      height: (value: string | null) => document.getElementById('famb-progress-bar').style.height = value || '20px',
      border: (value: string | null) => document.getElementById('famb-progress-bar').style.border = value || '3px solid #1f73e9',
      progressFill: (
        value: {
          backgroundColor?: string,
          height?: string
        } | null
      ) => {
        document.getElementById('famb-progress-fill').style.backgroundColor = value?.backgroundColor
        document.getElementById('famb-progress-fill').style.height = value?.height
      },
      progressValue: (
        value: {
          fontSize?: string
          position?: 'insideLeft' | 'insideRight' | 'bellowLeft' | 'bellowRight',
          backgroudColor?: string,
          color?: string,
        } | null
      ) => {
        document.getElementById('famb-progress-value').style.fontSize = value?.fontSize
        document.getElementById('famb-progress-value').style.backgroundColor = value?.backgroudColor
        document.getElementById('famb-progress-value').style.color = value?.color
        if(value.position){
          switch(value.position){
            case 'bellowLeft':
              document.getElementById('famb-progress-value').style.transform = 'translateY(calc(100% + 6px)) translateX(0px)'
              document.getElementById('famb-progress-value').style.marginLeft = '0px'
              break

            case 'bellowRight':
              document.getElementById('famb-progress-value').style.transform = 'translateY(calc(100% + 6px)) translateX(calc(-100% - 6px))'
              document.getElementById('famb-progress-value').style.marginLeft = '100%'
              break
            
            case 'insideLeft':
              document.getElementById('famb-progress-value').style.transform = 'translateY(0px) translateX(0px)'
              document.getElementById('famb-progress-value').style.marginLeft = '0px'
              break

            case 'insideRight':
              document.getElementById('famb-progress-value').style.transform = 'translateY(0px) translateX(calc(-100% - 6px))'
              document.getElementById('famb-progress-value').style.marginLeft = '100%'
              break
          }
        }
      }
    }
    useIntraDictionary(obj, intraDictionary)
  },
  secPlanBtn: (obj: fambButton | null) => {
    const intraDictionary = {
      width: (value: string | null) => document.getElementById('famb-progress-mainBtn').style.width = value || '100px',
      maxWidth: (value: string | null) => document.getElementById('famb-progress-mainBtn').style.maxWidth = value || '150px',
      padding: (value: string | null) => document.getElementById('famb-progress-mainBtn').style.padding = value || '12px 0px',
      fontSize: (value: string | null) => document.getElementById('famb-progress-mainBtn').style.fontSize = value || '1rem',
      color: (value: string | null) => document.getElementById('famb-progress-mainBtn').style.color = value || 'white',
      backgroundColor: (value: string | null) => document.getElementById('famb-progress-mainBtn').style.backgroundColor = value || '#0069ff',
      border: (value: string | null) => document.getElementById('famb-progress-mainBtn').style.border = value || 'none',
      borderRadius: (value: string | null) => document.getElementById('famb-progress-mainBtn').style.borderRadius = value || '6px',
      opacity: (value: string | null) => document.getElementById('famb-progress-mainBtn').style.opacity = value || '.8',
      hover: (obj: fambHoverButton | null) => {
        const previous = {
          color: document.getElementById('famb-progress-mainBtn').style.color,
          backgroundColor: document.getElementById('famb-progress-mainBtn').style.backgroundColor,
          opacity: document.getElementById('famb-progress-mainBtn').style.opacity,
        }
        document.getElementById('famb-progress-mainBtn').onmouseover = () => {
          document.getElementById('famb-progress-mainBtn').style.color = obj?.color
          document.getElementById('famb-progress-mainBtn').style.backgroundColor = obj?.backgroundColor
          document.getElementById('famb-progress-mainBtn').style.opacity = obj?.opacity
        }
        document.getElementById('famb-progress-mainBtn').onmouseleave = () => {
          document.getElementById('famb-progress-mainBtn').style.color = previous.color
          document.getElementById('famb-progress-mainBtn').style.backgroundColor = previous.backgroundColor
          document.getElementById('famb-progress-mainBtn').style.opacity = previous.opacity
        }
      }
    }
    useIntraDictionary(obj, intraDictionary)
  }
}

const defaultConfigs: fambProgressBoxConfigProtocol = {
  animationTime: 700,
  bgTransparencyRate: '.5',
  closeOnFinish: true
}

export class FAMBProgressBoxController {
  private configs: fambProgressBoxConfigProtocol
  private observer: Observable = new Observable()
  private globalEventRecorder: EventListenerRecorderProtocol = new EventListenerRecorder()
  private secPlan = false

  config(_configs: fambProgressBoxConfigProtocol): void {
    this.configs = Object.keys(_configs).length > 0 ? { ...defaultConfigs, ..._configs } : { ...defaultConfigs }
    document.getElementById('famb-alert-bg').style.transition = `${this.configs.animationTime || 600}ms ease`
    document.getElementById('famb-alert-box').style.transition = `${this.configs.animationTime || 600}ms ease`
    if(this.configs.progressBoxStyles !== undefined){
      Object.entries(this.configs.progressBoxStyles).forEach(e => {
        dictionary[e[0]](e[1])
      })
    }
  }

  show(title: string, buttons?: {secPlan: string}): Observable {
    if(this.configs === undefined) throw new Error('you must config this alert box first, use <FAMBAlertBoxController>.config()')
    document.getElementById('famb-progress-title').innerText = title
    document.getElementById('famb-progress-bg').style.display = 'flex'
    if(!this.globalEventRecorder.hasEventListener('id', 'click')){
      this.globalEventRecorder.registerEventListener('id', 'click')
      document.getElementById('famb-progress-mainBtn').addEventListener('click', () => {
        this.observer.emit('secPlan')
        this.secPlan = true
        document.getElementById('famb-progress-box').style.display = 'none'
        this.hide()
      })
    }
    document.getElementById('famb-progress-mainBtn').innerText = buttons?.secPlan|| 'Second Plan'
    
    setTimeout(() => {
      document.getElementById('famb-progress-bg').style.zIndex = '1'
      document.getElementById('famb-progress-bg').style.backgroundColor = `rgba(0, 0, 0, .7)`
      document.getElementById('famb-progress-box').style.transform = 'translateY(0px)'
      document.getElementById('famb-progress-box').style.opacity = '1'
    }, 10)
    return this.observer
  }

  update(value: number): void {
    if(!this.secPlan){
      document.getElementById('famb-progress-fill').style.width = `${value}%`
      document.getElementById('famb-progress-value').innerText = `${value}%`
    }
    if(value >= 100) setTimeout(() => {
      this.observer.emit('finish')
      document.getElementById('famb-progress-fill').style.width = '0px'
      if(this.configs.closeOnFinish){
        this.hide()
      }
    }, 500)
  }

  hide(): void {
    document.getElementById('famb-progress-bg').style.backgroundColor = `rgba(0, 0, 0, 0)`
    document.getElementById('famb-progress-box').style.transform = 'translateY(-100%)'
    document.getElementById('famb-progress-box').style.opacity = '0'
    document.getElementById('famb-progress-bg').style.zIndex = '-1'
    setTimeout(() => {
      document.getElementById('famb-progress-bg').style.display = 'none'
      this.observer.emit('hide')
    }, this.configs.animationTime || 600)
    this.observer.emit('close')
  }
}