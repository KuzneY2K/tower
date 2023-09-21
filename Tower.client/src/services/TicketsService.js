import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketsService {

    async getEventTickets(eventId){
        AppState.eventTickets = null
        const res = await api.get(`api/events/${eventId}/tickets`)
        AppState.eventTickets = res.data.map(ticket => new Ticket(ticket))
        // logger.log(AppState.eventTickets)
    }

    async createTicket(ticket){
        const res = await api.post(`api/tickets`, ticket)
        logger.log('CREATING TICKET')
        logger.log(res.data)
        let newTicket = new Ticket(res.data)
        AppState.eventTickets.push(newTicket)
    }

    async deleteTicket(ticketId){
        const res = await api.delete(`api/tickets/${ticketId}`)
        let filteredTickets = AppState.eventTickets.filter(ticket => ticket.id != ticketId)
        AppState.eventTickets = filteredTickets
    }

    async getAccountTickets(){
        const res = await api.get('account/tickets')
        AppState.myTickets = res.data.map(ticket => new Ticket(ticket))
    }

}

export const ticketsService = new TicketsService()