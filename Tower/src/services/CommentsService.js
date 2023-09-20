import { dbContext } from "../db/DbContext.js"

class CommentsService {
    async createComment(commentBody) {
        const newComment = await dbContext.Comments.create(commentBody)
        await newComment.populate('creator', 'name picture id _id')
        await newComment.populate('event', 'name id _id')
        return newComment
    }

}

export const commentsService = new CommentsService()