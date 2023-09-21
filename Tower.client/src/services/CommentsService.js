import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService {
    async getEventComments(eventId){
        logger.log('GETTING COMMENTS')
        AppState.eventComments = null
        const res = await api.get(`api/events/${eventId}/comments`)
        AppState.eventComments = res.data.map(comment => new Comment(comment))
        logger.log(AppState.eventComments)
    }
}

export const commentsService = new CommentsService()