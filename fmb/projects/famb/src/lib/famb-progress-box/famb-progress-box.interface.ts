import { fambDescription, fambButton, fambTitle } from "../modal-box-global-style.interface";

export interface fambProgressStylesProtocol {
  width?: string,
  maxWidth?: string,
  minHeight?: string,
  backgroundColor?: string,
  border?: string,
  borderRadius?: string,
  title?: fambTitle,
  progressBar?: fambProgressBar,
  secPlanBtn?: fambButton
}

export interface fambProgressBar {
  width?: string,
  maxWidth?: string,
  height?: string,
  border?: string,
  progressFill?:{
    backgroundColor?: string,
    height?: string,
  },
  progressValue?:{
    fontSize?: string
    position?: 'insideLeft' | 'insideRight' | 'bellowLeft' | 'bellowRight',
    backgroudColor?: string,
    color?: string,
  }
}