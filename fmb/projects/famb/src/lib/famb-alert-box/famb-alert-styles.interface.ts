import { fambDescription, fambButton, fambTitle } from "../modal-box-global-style.interface";

export interface fambAlertStylesProtocol {
  width?: string,
  maxWidth?: string,
  minHeight?: string,
  backgroundColor?: string,
  border?: string,
  borderRadius?: string,
  title?: fambTitle,
  description?: fambDescription,
  okButton?: fambButton
}