import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { logger } from "../utils/Logger.js";

class EventsService {
    async getEventTickets(eventId) {
        // let event = await dbContext.Events.findById(eventId)
        const tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile', 'name')
        return tickets
    }

    // GET ALL EVENTS
    async getAllEvents(query) {
        try {
            const allEvents = await dbContext.Events.find(query).populate('creator ticketCount', 'name picture id _id')
            return allEvents
        } catch (error) {
            logger.log(error)
            throw new BadRequest(error.message)
        }
    }
    async getEventById(eventId) {
        let event = await dbContext.Events.findById(eventId).populate('creator ticketCount', 'name picture')
        return event
    }

    // CREATE EVENT
    async createEvent(eventBody) {
        try {
            const newEvent = await dbContext.Events.create(eventBody)
            await newEvent.populate('creator', 'name picture')
            await newEvent.populate('ticketCount')
            return newEvent
        } catch (error) {
            logger.log(error)
            throw new BadRequest(error.message)
        }
    }

    // EDIT EVENT
    async editEvent(updateBody, eventId, userId) {
        try {
            const eventToEdit = await dbContext.Events.findById(eventId)
            if (eventToEdit.isCanceled == false) {
                if (eventToEdit.creatorId != userId) throw new Forbidden('Uh uh uh, not your event to edit.')
                eventToEdit.name = updateBody.name ? updateBody.name : eventToEdit.name
                eventToEdit.description = updateBody.description ? updateBody.description : eventToEdit.description
                eventToEdit.coverImg = updateBody.coverImg ? updateBody.coverImg : eventToEdit.coverImg
                eventToEdit.capacity = updateBody.capacity ? updateBody.capacity : eventToEdit.capacity
                eventToEdit.location = updateBody.location ? updateBody.location : eventToEdit.location
                eventToEdit.type = updateBody.type ? updateBody.type : eventToEdit.type
                eventToEdit.isCanceled = updateBody.isCancelled ? updateBody.isCancelled : eventToEdit.isCanceled
                await eventToEdit.save()
                return eventToEdit
            } else if (eventToEdit.isCanceled == true) {
                throw new BadRequest('Its already canceled, you can not edit it!')
            }
        } catch (error) {
            logger.log(error)
            throw new BadRequest(error.message)
        }
    }

    // DELETE EVENT
    async cancelEvent(eventId, userId) {
        const eventToCancel = await dbContext.Events.findById(eventId)
        if (eventToCancel.creatorId != userId) throw new Forbidden("You can't do that! Not your event!")
        if (eventToCancel.isCanceled == false) {
            eventToCancel.isCanceled = true
            await eventToCancel.save()
            return eventToCancel
        } else if (eventToCancel.isCanceled == true) {
            throw new BadRequest('Its already canceled, you can not uncancel!')
        }
    }

}

export const eventsService = new EventsService()