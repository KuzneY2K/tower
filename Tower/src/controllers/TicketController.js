import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";
import { eventsService } from "../services/EventsService.js";

export class TicketController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            .delete('/:ticketId', this.deleteTicket)
    }

    async createTicket(req, res, next) {
        try {
            const ticketBody = req.body
            ticketBody.accountId = req.userInfo.id
            const newTicket = await ticketsService.createTicket(ticketBody)
            res.send(newTicket)
        } catch (error) {
            next(error)
        }
    }

    async deleteTicket(req, res, send) {
        try {

        } catch (error) {

        }
    }
}