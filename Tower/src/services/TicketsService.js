import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketsService {
    async createTicket(ticketBody) {
        const newTicket = await dbContext.Tickets.create(ticketBody)
        await newTicket.populate('profile', 'name picture')
        await newTicket.populate('event', 'id name ticketCount')
        return newTicket
    }
    async getMyTickets(accountId) {
        let myTickets = dbContext.Tickets.find({ accountId }).populate('event profile', 'name id _id picture')
        return myTickets
    }
    async deleteTicket(ticketId, userId) {
        const ticketToDelete = await dbContext.Tickets.findById(ticketId).populate('profile event')
        if (!ticketToDelete) {
            throw new BadRequest('Come on, wrong ticket.')
        }
        if (ticketToDelete.accountId != userId) {
            throw new Forbidden('Ay yo? Not your ticket...')
        }
        ticketToDelete.remove()
        return `${ticketToDelete.eventId} <= removed`
    }

}

export const ticketsService = new TicketsService()