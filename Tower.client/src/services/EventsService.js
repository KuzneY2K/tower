import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Event } from "../models/Event.js"

class EventsService{
    async getEvents(){
        const res = await api.get('api/events')
        // logger.log(res)
        AppState.events = res.data.map(event => new Event(event))
        // logger.log(AppState.events)
    }

    async getEventById(eventId){
        let res = await api.get(`api/events/${eventId}`)
        AppState.activeEvent = new Event(res.data)
        // logger.log(AppState.activeEvent)
    }
}

export const eventsService = new EventsService()