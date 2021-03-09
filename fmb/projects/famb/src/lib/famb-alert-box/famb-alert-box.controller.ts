import { fambModalBoxConfigProtocol } from './../modal-box-config.interface';

interface Observable {
  event: string,
  method: Function
}

function Observer () {
  let observables: Observable[] = []
}

Observer.prototype = {
  subscribe(obs: Observable): void {
    this.observables.push(obs)
  },

  unsubscribe(event: string): void {
    this.observables = this.observables.filter((e: Observable) => e.event !== event)
  },

  emit(event: string): void {
    this.observables
      .filter((e: Observable) => e.event === event)
      .forEach((e: Observable) => e.method())
  }
}

const dictionary = {
  width: (value: string | null) => document.getElementById('famb-alert-box').style.width = value || '90%',
  maxWidth: (value: string | null) => document.getElementById('famb-alert-box').style.maxWidth = value || '400px',
  minHeight: (value: string | null) => document.getElementById('famb-alert-box').style.minHeight = value || '200px',
  backgroundColor: (value: string | null) => document.getElementById('famb-alert-box').style.backgroundColor = value || 'white',
  border: (value: string | null) => document.getElementById('famb-alert-box').style.border = value || 'none',
  borderRadius: (value: string | null) => document.getElementById('famb-alert-box').style.borderRadius = value || '6px',
}

const defaultConfigs = {
  animationTime: 700,
  bgTransparencyRate: '.5',
  hideOnClickBackground: true
}

export class FAMBAlertBoxController {
  private configs: fambModalBoxConfigProtocol
  
  config(_configs: fambModalBoxConfigProtocol): void {
    this.configs = Object.keys(_configs).length > 0 ? { ..._configs, ...defaultConfigs } : { ...defaultConfigs }
    
    console.log('configs: ', this.configs)
    document.getElementById('famb-alert-bg').style.transition = `${this.configs.animationTime || 600}ms ease`
    if(Object.keys(this.configs.alertStyles).length){
      Object.entries(this.configs.alertStyles).forEach(e => {
        dictionary[e[0]](e[1])
      })
    }
  }

  show(): void {
    if(this.configs === undefined) throw new Error('you must config this alert box first, use <FAMBAlertBoxController>.config()')
    console.log(this.configs)
    document.getElementById('famb-alert-bg').style.display = 'flex'
    setTimeout(() => {
      document.getElementById('famb-alert-bg').style.zIndex = '1'
      document.getElementById('famb-alert-bg').style.backgroundColor = `rgba(0, 0, 0, .7)`
    }, 10)
  }
}