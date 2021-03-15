import { inputEvents } from './famb-input-box/famb-input-box.controller';
import { confirmEvents } from './famb-confirm-box/famb-confirm-box.controller';
import { alertEvents } from "./famb-alert-box/famb-alert-box.controller"

type eventTypes = alertEvents | confirmEvents | inputEvents

export interface Observer {
  event: eventTypes,
  method: Function
}

export class Observable {
  observables: Observer[] = []

  on(event: eventTypes , func: Function): void {
    if(this.observables.filter((e: Observer) => e.event === event).length === 0){
      this.observables.push({event, method: func})
    }else{
      this.observables.filter((e: Observer) => e.event === event)[0].method = func
    }   
  }

  unsubscribe(event: eventTypes): void {
    this.observables = this.observables.filter((e: Observer) => e.event !== event)
  }

  emit(event: eventTypes): void {
    this.observables.filter((e: Observer) => e.event === event)[0]?.method()
  }

  emitValue(event: eventTypes, value: any): void {
    this.observables.filter((e: Observer) => e.event === event)[0]?.method(value)
  }
}