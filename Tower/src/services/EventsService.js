import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";
import { logger } from "../utils/Logger.js";

class EventsService {

    // GET ALL EVENTS
    async getAllEvents(query) {
        try {
            const allEvents = await dbContext.Events.find(query).populate('eventCreatorId eventCreatorPicture eventCreatorName eventTicketCount')
            return allEvents
        } catch (error) {
            logger.log(error)
            throw new BadRequest('Get All Events Error')
        }
    }

    // CREATE EVENT
    async createEvent(eventBody) {
        try {
            const newEvent = await dbContext.Events.create(eventBody)
            await newEvent.populate('eventCreatorId eventCreatorPicture eventCreatorName eventTicketCount')
            return newEvent
        } catch (error) {
            logger.log(error)
            throw new BadRequest('Create Events Error')
        }
    }

    // EDIT EVENT
    async editEvent(updateBody, eventId) {
        try {
            const eventToEdit = await dbContext.Events.findById(eventId)
            eventToEdit.eventName = updateBody.eventName ? updateBody.eventName : eventToEdit.eventName
            eventToEdit.eventDescription = updateBody.eventDescription ? updateBody.eventDescription : eventToEdit.eventDescription
            eventToEdit.eventImg = updateBody.eventImg ? updateBody.eventImg : eventToEdit.eventImg
            eventToEdit.capacity = updateBody.capacity ? updateBody.capacity : eventToEdit.capacity
            eventToEdit.location = updateBody.location ? updateBody.location : eventToEdit.location
            eventToEdit.type = updateBody.type ? updateBody.type : eventToEdit.type
            eventToEdit.isCancelled = updateBody.isCancelled ? updateBody.isCancelled : eventToEdit.isCancelled
            eventToEdit.save()
            return eventToEdit
        } catch (error) {
            logger.log(error)
            throw new BadRequest('Edit Event Error')
        }
    }

    // DELETE EVENT
    async deleteEvent(eventId) {
        try {
            const eventToDelete = await dbContext.Events.findById(eventId)
            if (!eventToDelete) {
                throw new BadRequest(`${eventToDelete.eventName} <= wrong one.`)
            }
            eventToDelete.remove()
            return `${eventToDelete.eventName} was removed.`
        } catch (error) {
            logger.log(error)
            throw new BadRequest('Delete Event Error')
        }
    }

}

export const eventsService = new EventsService()