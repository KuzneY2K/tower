import { dbContext } from "../db/DbContext.js"

class TicketsService {
    async createTicket(ticketBody) {
        const newTicket = await dbContext.Tickets.create(ticketBody)
        await newTicket.populate('profile', 'name picture')
        await newTicket.populate('event', 'id name ticketCount')
        return newTicket
    }
    async getMyTickets(accountId) {
        let myTickets = dbContext.Tickets.find({ accountId }).populate('event', 'name id _id')
        return myTickets
    }

}

export const ticketsService = new TicketsService()