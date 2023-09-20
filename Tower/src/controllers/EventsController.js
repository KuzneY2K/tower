import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService.js";
import BaseController from "../utils/BaseController.js";

export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllEvents)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.deleteEvent)
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

    // CREATE EVENT
    async createEvent(req, res, next) {
        try {
            let eventBody = req.body
            eventBody.creatorId = req.userInfo.id
            eventBody.creatorPicture = req.userInfo.picture
            eventBody.creatorName = req.userInfo.nickname
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

    async deleteEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            let eventToDelete = await eventsService.deleteEvent(eventId)
            res.send(eventToDelete)
        } catch (error) {
            next(error)
        }
    }
}