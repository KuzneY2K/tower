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
        // logger.log(AppState.eventComments)
    }

    async deleteComment(commentId){
        const res = await api.delete(`api/comments/${commentId}`)
        // logger.log(res)
        let filteredComments = AppState.eventComments.filter(comment => comment.id != commentId)
        AppState.eventComments = filteredComments
    }

    async createComment(eventId, comment){
        const res = await api.post(`api/events/${eventId}/comments`, comment)
        let newComment = new Comment(res.data)
        logger.log(newComment)
    }
}

export const commentsService = new CommentsService()