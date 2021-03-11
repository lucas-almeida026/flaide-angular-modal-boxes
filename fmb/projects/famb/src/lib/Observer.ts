import { alertEvents } from "./famb-alert-box/famb-alert-box.controller"

export interface Observable {
  event: alertEvents,
  method: Function
}

export class Observer {
  observables: Observable[] = []

  on(event: alertEvents , func: Function): void {
    if(this.observables.filter((e: Observable) => e.event === event).length === 0){
      this.observables.push({event, method: func})
    }else{
      this.observables.filter((e: Observable) => e.event === event)[0].method = func
    }   
  }

  unsubscribe(event: alertEvents): void {
    this.observables = this.observables.filter((e: Observable) => e.event !== event)
  }

  emit(event: alertEvents): void {
    this.observables.filter((e: Observable) => e.event === event)[0]?.method()
  }

  emitValue(event: alertEvents, value: any): void {
    this.observables.filter((e: Observable) => e.event === event)[0]?.method(value)
  }
}