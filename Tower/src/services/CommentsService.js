import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentsService {
    async getEventComments(eventId) {
        const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator event', 'name picture id _id')
        return comments
    }
    async createComment(commentBody) {
        const newComment = await dbContext.Comments.create(commentBody)
        await newComment.populate('creator', 'name picture id _id')
        await newComment.populate('event', 'name id _id')
        return newComment
    }
    async deleteComment(commentId, userId) {
        const commentToDelete = await dbContext.Comments.findById(commentId)
        if (commentToDelete.creatorId != userId) {
            throw new Forbidden('Ay yo? This isnt your comment...')
        }
        if (!commentToDelete) {
            throw new BadRequest('Wrong comment, try again.')
        }
        commentToDelete.remove()
        return `${commentToDelete.id} was removed.`
    }

}

export const commentsService = new CommentsService()