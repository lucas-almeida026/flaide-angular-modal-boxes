import { fambDescription, fambButton, fambTitle } from "../modal-box-global-style.interface";

export interface fambConfirmStylesProtocol {
  width?: string,
  maxWidth?: string,
  minHeight?: string,
  backgroundColor?: string,
  border?: string,
  borderRadius?: string,
  title?: fambTitle,
  question?: fambDescription,
  okButton?: fambButton
  cancelButton?: fambButton
}