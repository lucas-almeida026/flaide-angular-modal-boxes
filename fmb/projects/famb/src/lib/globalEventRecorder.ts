interface Event {
  id: string, 
  eventName: string
}

interface getListOfListenersProtocol {
  (id: string, eventName: string): Event[],
}

interface registerEventListenerProtocol {
  (id: string, eventName: string): void,
}

interface hasEventListenerProtocol {
  (id: string, eventName: string): boolean,
}

export interface EventListenerRecorderProtocol {
  getListOfListeners: getListOfListenersProtocol,
  registerEventListener: registerEventListenerProtocol,
  hasEventListener: hasEventListenerProtocol
}



export function EventListenerRecorder() {
  this.eventList = []
}

EventListenerRecorder.prototype = {
  getListOfListeners: function (id: string, eventName: string) {
    return this.eventList.filter((e: Event) => e.id === id && e.eventName === eventName)
  },
  registerEventListener: function (id: string, eventName: string) {this.eventList.push({id, eventName})},
  hasEventListener: function (id: string, eventName: string) {return !!this.getListOfListeners(id, eventName).length}
}

