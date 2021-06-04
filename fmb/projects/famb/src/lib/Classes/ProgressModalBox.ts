import { FAMBAllModalBoxesConfig, FAMBProgressBoxConfig, IProgressModal, IReturnableObservable, ProgressEvents, ProgressOptions } from './../Utils/FAMB.type';
import { Observable } from "./../Utils/Observable";
import { EventListenerRecorder } from "./../Utils/EventListenerRecorder";
import ObjectEntries from './../Utils/ObjectEntries';

export class ProgressModalBox implements IProgressModal {
  private observable = new Observable<ProgressEvents>();
  private globalEventRecorder = new EventListenerRecorder()
  private configs!: FAMBProgressBoxConfig
  private configured = false
  private secPlan: boolean = false
  
  constructor(_configs: FAMBAllModalBoxesConfig){
    this.configs = _configs
  }

  private config(){
    (document.getElementById('famb-progress-bg') as HTMLElement).style.transition = ` background ${this.configs.animationTime || 600}ms ease`;
    (document.getElementById('famb-progress-box') as HTMLElement).style.transition = `${this.configs.animationTime || 600}ms ease`;
    if(this.configs.hideOnClickBackground){
      (document.getElementById('famb-progress-bg') as HTMLElement).onclick = () => this.hide()
    }
    ObjectEntries(this.configs.styles).forEach(element => {
      this.applyStylesFromConfig(`famb-progress-${element[0]}`, element[1])
    })
  }

  private applyStylesFromConfig(id, styles){
    Object.entries(styles)
      .forEach(style => (document.getElementById(id) as HTMLElement).style[style[0]] = style[1])
  }

  show(title: string, options?: ProgressOptions) {
    if(!this.configured) this.config();
    if(this.secPlan) throw new Error('This application already has a progress bar in process');

    if(!!options?.labelValuePosition){
      switch(options?.labelValuePosition){
        case 'bellowLeft':
          (document.getElementById('famb-progress-value') as HTMLElement).style.transform = 'translateY(calc(100% + 6px)) translateX(0px)';
          (document.getElementById('famb-progress-value') as HTMLElement).style.marginLeft = '0px';
          break

        case 'bellowRight':
          (document.getElementById('famb-progress-value') as HTMLElement).style.transform = 'translateY(calc(100% + 6px)) translateX(calc(-100% - 6px))';
          (document.getElementById('famb-progress-value') as HTMLElement).style.marginLeft = '100%';
          break
        
        case 'insideLeft':
          (document.getElementById('famb-progress-value') as HTMLElement).style.transform = 'translateY(0px) translateX(0px)';
          (document.getElementById('famb-progress-value') as HTMLElement).style.marginLeft = '0px';
          break

        case 'insideRight':
          (document.getElementById('famb-progress-value') as HTMLElement).style.transform = 'translateY(0px) translateX(calc(-100% - 6px))';
          (document.getElementById('famb-progress-value') as HTMLElement).style.marginLeft = '100%';
          break

        default:
          break
      }
    }
    (document.getElementById('famb-progress-title') as HTMLElement).innerText = title;
    (document.getElementById('famb-progress-bg') as HTMLElement).style.display = 'flex';
    (document.getElementById('famb-progress-box') as HTMLElement).style.display = 'flex';
    if(!this.globalEventRecorder.hasEventListener('id', 'click')){
      this.globalEventRecorder.registerEventListener('id', 'click');
      (document.getElementById('famb-progress-secondPlanButton') as HTMLElement).addEventListener('click', () => {
        this.observable.emit('secondPlan')
        this.secPlan = true;
        (document.getElementById('famb-progress-box') as HTMLElement).style.display = 'none';
        this.hide()
      })
    }
    (document.getElementById('famb-progress-secondPlanButton') as HTMLElement).innerText = options?.secondPlanButtonText || 'Second Plan';
    
    setTimeout(() => {      
      (document.getElementById('famb-progress-bg') as HTMLElement).style.zIndex = '99';
      (document.getElementById('famb-progress-bg') as HTMLElement).style.backgroundColor = `rgba(0, 0, 0, .7)`;
      (document.getElementById('famb-progress-box') as HTMLElement).style.transform = 'translateY(0px)';
      (document.getElementById('famb-progress-box') as HTMLElement).style.opacity = '1';
    }, 10)

    let returnable: IReturnableObservable<ProgressEvents> = this.observable
    return returnable
  }

  hide() {
    (document.getElementById('famb-progress-bg') as HTMLElement).style.backgroundColor = `rgba(0, 0, 0, 0)`;
    (document.getElementById('famb-progress-box') as HTMLElement).style.transform = 'translateY(-100%)';
    (document.getElementById('famb-progress-box') as HTMLElement).style.opacity = '0';
    (document.getElementById('famb-progress-bg') as HTMLElement).style.zIndex = '-1';
    setTimeout(() => {
      (document.getElementById('famb-progress-bg') as HTMLElement).style.display = 'none';
      this.observable.emit('hide')
    }, this.configs.animationTime)
    this.observable.emit('close')
  }

  update(value: number){
    if(value <= 100){
      if(!this.secPlan){
        (document.getElementById('famb-progress-box') as HTMLElement).style.display = 'flex';
        (document.getElementById('famb-progress-fill') as HTMLElement).style.width = `${value}%`;
        (document.getElementById('famb-progress-value') as HTMLElement).innerText = `${value}%`;
      }
    }else{
      (document.getElementById('famb-progress-fill') as HTMLElement).style.width = `100%`;
      (document.getElementById('famb-progress-value') as HTMLElement).innerText = `100%`;
      setTimeout(() => {
        this.observable.emit('finish');
        this.secPlan = false;
        if(this.configs.closeOnFinish){
          this.hide()
        }
      }, this.configs.animationTime)
      return
    }    
  }
}