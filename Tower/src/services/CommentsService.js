import { dbContext } from "../db/DbContext.js"

class CommentsService {
    async createComment(commentBody) {
        const newComment = await dbContext.Comments.create(commentBody)
        await newComment.populate('creator')
        await newComment.populate('event')
        return newComment
    }

}

export const commentsService = new CommentsService()