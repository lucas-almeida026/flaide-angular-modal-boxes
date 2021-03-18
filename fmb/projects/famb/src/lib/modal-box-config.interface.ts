import { fambProgressStylesProtocol } from './famb-progress-box/famb-progress-box.interface';
import { fambInputStylesProtocol } from './famb-input-box/famb-input-styles.interface';
import { fambConfirmStylesProtocol } from './famb-confirm-box/famb-confirm-box.interface';
import { fambAlertStylesProtocol } from "./famb-alert-box/famb-alert-styles.interface";

export interface fambAlertBoxConfigProtocol {
  animationTime?: number,
  bgTransparencyRate?: string,
  hideOnClickBackground?: boolean,
  alertBoxStyles?: fambAlertStylesProtocol,
}

export interface fambConfirmBoxConfigProtocol {
  animationTime?: number,
  bgTransparencyRate?: string,
  hideOnClickBackground?: boolean,
  confirmBoxStyles?: fambConfirmStylesProtocol,
}

export interface fambInputBoxConfigProtocol {
  animationTime?: number,
  bgTransparencyRate?: string,
  hideOnClickBackground?: boolean,
  inputBoxStyles?: fambInputStylesProtocol,
}

export interface fambProgressBoxConfigProtocol {
  animationTime?: number,
  bgTransparencyRate?: string,
  closeOnFinish?: boolean,
  progressBoxStyles?: fambProgressStylesProtocol,
}