type Event = {
  id: string, 
  eventName: string
}

interface IEventListenerRecorder {
  eventList: Event[],
  getListOfListeners: (id: string, eventName: string) => Event[],
  registerEventListener: (id: string, eventName: string) => void,
  hasEventListener: (id: string, eventName: string) => boolean
}

export class EventListenerRecorder implements IEventListenerRecorder {
  eventList: Event[] = []
  getListOfListeners(id: string, eventName: string){
    return this.eventList.filter((e: Event) => e.id === id && e.eventName === eventName)
  }
  
  registerEventListener(id: string, eventName: string){
    this.eventList.push({id, eventName})
  }

  hasEventListener(id: string, eventName: string){
    return !!this.getListOfListeners(id, eventName).length
  }
}