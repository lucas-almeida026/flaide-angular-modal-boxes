import { ProgressModalBox } from './Classes/ProgressModalBox';
import { InputModalBox } from './Classes/InputModalBox';
import { ConfirmModalBox } from './Classes/ConfirmModalBox';
import { EventListenerRecorder } from './Utils/EventListenerRecorder';
import { Injectable } from "@angular/core";
import { AlertEvents, FAMBAlertBoxConfig, FAMBAllModalBoxesConfig, FAMBConfirmBoxConfig, FAMBGlobalColorsConfig, FAMBInputBoxConfig, FAMBProgressBoxConfig, IAlertModal, IConfirmModal, IInputModal, IProgressModal } from "./Utils/FAMB.type";
import { Observable } from "./Utils/Observable";
import { AlertModalBox } from './Classes/AlertModalBox';

interface FAMBGlobal {
  alert: AlertModalBox
}

@Injectable({providedIn: 'root'})
export class FAMB implements FAMBGlobal {

  private globalConfigs: FAMBAllModalBoxesConfig = {
    animationTime: 600,
    bgTransparencyRate: '.7',
    hideOnClickBackground: false,
    styles: {
      box: {
        backgroundColor: 'white'
      }
    }
  }
  private globalColors: FAMBGlobalColorsConfig = {}




  private defaultAlertConfig: FAMBAllModalBoxesConfig = {hideOnClickBackground: true}
  alert = new AlertModalBox({...this.globalConfigs, ...this.defaultAlertConfig})
  confirm = new ConfirmModalBox(this.globalConfigs)
  input = new InputModalBox(this.globalConfigs)
  progress = new ProgressModalBox(this.globalConfigs)



  
  configGlobalColors(obj: FAMBGlobalColorsConfig){
    if(this.validateColors(obj)){
      this.globalColors = obj
    }
  }

  configAllModalBoxes(obj: FAMBAllModalBoxesConfig){
    this.alert = new AlertModalBox(
      this.getObjectConfigWithColorTranslated(this.globalColors, {...this.globalConfigs, ...obj})
    )
  }

  configAlertBox(obj: FAMBAlertBoxConfig){
    this.alert = new AlertModalBox(
      this.getObjectConfigWithColorTranslated(
        this.globalColors,
        {
          ...{...this.globalConfigs, ...this.defaultAlertConfig},
          ...obj
        }
      )
    )
  }

  configConfirmBox(obj: FAMBConfirmBoxConfig){
    this.confirm = new ConfirmModalBox(
      this.getObjectConfigWithColorTranslated(this.globalColors, {...this.globalConfigs, ...obj})
    )
  }

  configInputBox(obj: FAMBInputBoxConfig){
    this.input = new InputModalBox(
      this.getObjectConfigWithColorTranslated(this.globalColors, {...this.globalConfigs, ...obj})
    )
  }

  configProgressBox(obj: FAMBProgressBoxConfig){
    this.progress = new ProgressModalBox(
      this.getObjectConfigWithColorTranslated(this.globalColors, {...this.globalConfigs, ...obj})
    )
  }

  private getObjectConfigWithColorTranslated(objColors, objConfigs): FAMBAllModalBoxesConfig | FAMBAlertBoxConfig | FAMBConfirmBoxConfig{
    let res = {}
    Object.entries(objConfigs.styles).forEach((styleGroup: [string, any] ) => {
      res[styleGroup[0]] = undefined
      let resStylegroup = {}

      Object.entries(styleGroup[1]).forEach((style: [string, any]) => {        
        let finalStyle

        Object.entries(objColors).forEach(color => {
          if(style[1].includes(color[0])){
            finalStyle = style[1].replace(color[0], color[1])
          }
          resStylegroup[style[0]] = !!finalStyle ? finalStyle : style[1]
        })

        res[styleGroup[0]] = resStylegroup
      })
    })
    objConfigs.styles = res
    return objConfigs
  }

  private validateColors(objColors): boolean{
    Object.entries(objColors)
      .forEach(e => {
        let matched = /#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})/.exec((e[1] as string))
        if(matched === null) throw new Error(`Invalid hex color code "${e[1]}" at <FAMB.configGlobalColors>`)
        if(matched[0] !== matched.input) throw new Error(`Invalid hex color code "${e[1]}" at <FAMB.configGlobalColors>`)
      })
    return true
  }

}