import { fambButton, fambDescription, fambTitle } from './../modal-box-global-style.interface';

export interface fambInputInput{
  width?: string,
  maxWidth?: string,
  padding?: string,
  color?: string,
  fontSize?: string,
  border?: string,
  borderRadius?: string,
  placeholderText?: string,
}

export interface fambInputStylesProtocol {
  width?: string,
  maxWidth?: string,
  minHeight?: string,
  backgroundColor?: string,
  border?: string,
  borderRadius?: string,
  title?: fambTitle,
  question?: fambDescription,
  sendButton?: fambButton,
  input?: fambInputInput
}