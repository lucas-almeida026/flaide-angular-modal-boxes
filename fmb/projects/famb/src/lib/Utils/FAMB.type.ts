import * as CSS from 'csstype'

export type AlertEvents = 'hide' | 'close' | 'ok'
export type ConfirmEvents = 'hide' | 'close' | 'cancel' | 'ok'
export type InputEvents = 'hide' | 'close' | 'send' | 'keyup' | 'keypress' | 'keydown'
export type ProgressEvents = 'hide' | 'close' | 'secondPlan' | 'finish'

export type AlertOptions = {okButtonText?: string}
export type IAlertModal = {
  show: (title: string, description: string, options?: AlertOptions) => IReturnableObservable<AlertEvents>,
  hide: () => void
}

export type ConfirmOptions = {okButtonText?: string, cancelButtonText: string}
export type IConfirmModal = {
  show: (title: string, description: string) => IReturnableObservable<ConfirmEvents>,
  hide: () => void
}

export type InputOptions = {sendButtonText?: string, inputPlaceholder?: string, pressingEnterClicksTheButton?: boolean}
export type IInputModal = {
  show: (title: string, description: string, options?: InputOptions) => IReturnableObservable<InputEvents>,
  hide: () => void
}

export type ProgressOptions = {secondPlanButtonText?: string, labelValuePosition?: 'insideLeft' | 'insideRight' | 'bellowLeft' | 'bellowRight'}
export type IProgressModal = {
  show: (title: string, options?: ProgressOptions) => IReturnableObservable<ProgressEvents>,
  hide: () => void,
  update: (value: number) => void
}
export type FAMBAllModalBoxesConfig = {
  animationTime?: number,
  bgTransparencyRate?: string,
  hideOnClickBackground?: boolean,
  styles?: {
    box?: CSS.StandardProperties
  }
}

export type FAMBAlertBoxConfig = {
  animationTime?: number,
  bgTransparencyRate?: string,
  hideOnClickBackground?: boolean,
  styles?: {
    box?: CSS.StandardProperties,
    title?: CSS.StandardProperties,
    description?: CSS.StandardProperties,
    okButton?: CSS.StandardProperties,
  }
}

export type FAMBConfirmBoxConfig = {
  animationTime?: number,
  bgTransparencyRate?: string,
  hideOnClickBackground?: boolean,
  styles?: {
    box?: CSS.StandardProperties,
    title?: CSS.StandardProperties,
    question?: CSS.StandardProperties,
    okButton?: CSS.StandardProperties,
    cancelButton?: CSS.StandardProperties,
  }
}

export type FAMBInputBoxConfig = {
  animationTime?: number,
  bgTransparencyRate?: string,
  hideOnClickBackground?: boolean,
  styles?: {
    box?: CSS.StandardProperties,
    title?: CSS.StandardProperties,
    description?: CSS.StandardProperties,
    sendButton?: CSS.StandardProperties,
    input?: CSS.StandardProperties,
  }
}

export type FAMBProgressBoxConfig = {
  animationTime?: number,
  bgTransparencyRate?: string,
  hideOnClickBackground?: boolean,
  closeOnFinish?: boolean,
  styles?: {
    box?: CSS.StandardProperties,
    bar?: CSS.StandardProperties,
    fill?: CSS.StandardProperties,
    value?: CSS.StandardProperties,
    title?: CSS.StandardProperties,
    secondPlanButton?: CSS.StandardProperties,
  }
}

export type FAMBGlobalColorsConfig = {
  [key: string]: string
}

export interface IReturnableObservable<EventType> {
  on: (event: EventType, fun: Function) => IReturnableObservable<EventType>,
  unsubscribe: (event: EventType) => void
}