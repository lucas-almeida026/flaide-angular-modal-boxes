export type textAlign = 'center' | 'left' | 'right'

export interface fambTitle {
  fontSize?: string,
  color?: string,
  textAlign?: textAlign,
}

export interface fambDescription {
  fontSize?: string,
  color?: string,
  minHeight?: string,
  textAlign?: textAlign | 'justify',
}

export interface fambButton {
  width?: string,
  maxWidth?: string,
  padding?: string,
  fontSize?: string,
  color?: string,
  backgroundColor?: string,
  border?: string,
  borderRadius?: string,
  opacity?: string,
  hover?: fambHoverButton
}

export interface fambHoverButton {
  color?: string,
  backgroundColor?: string,
  opacity?: string
}