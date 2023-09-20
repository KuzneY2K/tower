import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService.js";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";

export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllEvents)
            .get('/:eventId', this.getEventById)
            .get('/:eventId/tickets', this.getEventTickets)
            .get('/:eventId/comments', this.getEventComments)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.cancelEvent)
    }

    // GET ALL EVENTS
    async getAllEvents(req, res, next) {
        try {
            const allEvents = await eventsService.getAllEvents(req.query)
            res.send(allEvents)
        } catch (error) {
            next(error)
        }
    }

    async getEventById(req, res, next) {
        try {
            let eventId = req.params.eventId
            const event = await eventsService.getEventById(eventId)
            res.send(event)
        } catch (error) {
            next(error)
        }
    }

    // CREATE EVENT
    async createEvent(req, res, next) {
        try {
            let eventBody = req.body
            eventBody.creatorId = req.userInfo.id
            // eventBody.creator = req.userInfo
            const newEvent = await eventsService.createEvent(eventBody)
            res.send(newEvent)
        } catch (error) {
            next(error)
        }
    }

    async editEvent(req, res, next) {
        try {
            const updateBody = req.body
            const eventId = req.params.eventId
            const eventToEdit = await eventsService.editEvent(updateBody, eventId)
            res.send(eventToEdit)
        } catch (error) {
            next(error)
        }
    }

    async cancelEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            let eventToCancel = await eventsService.cancelEvent(eventId, req.userInfo.id)
            res.send(eventToCancel)
        } catch (error) {
            next(error)
        }
    }

    async getEventTickets(req, res, next) {
        try {
            const tickets = await eventsService.getEventTickets(req.params.eventId)
            res.send(tickets)
        } catch (error) {
            next(error)
        }
    }

    async getEventComments(req, res, next) {
        try {
            const comments = await commentsService.getEventComments(req.params.eventId)
            res.send(comments)
        } catch (error) {
            next(error)
        }
    }
}