import { AlertEvents, ConfirmEvents } from './FAMB.type';

type Observer<EventType> = {
  event: EventType,
  method: Function
}

export class Observable<EventType> {
  private observables: Observer<EventType>[] = []

  on(event: EventType, fun: Function): Observable<EventType> {
    if(this.observables.filter((e: Observer<EventType>) => e.event === event).length === 0){
      this.observables.push({event, method: fun})
    }else{
      this.observables.filter((e: Observer<EventType>) => e.event === event)[0].method = fun
    }
    return this
  }

  unsubscribe(event: EventType): void {
    this.observables = this.observables.filter((e: Observer<EventType>) => e.event !== event)
  }

  emit(event: EventType): void {
    this.observables.filter((e: Observer<EventType>) => e.event === event)[0]?.method()
  }

  emitValue(event: EventType, value: any): void {
    this.observables.filter((e: Observer<EventType>) => e.event === event)[0]?.method(value)
  }
}