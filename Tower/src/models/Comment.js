import { Schema } from "mongoose";

export const CommentSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    body: { type: String, required: true, maxlength: 100, minlength: 1 }
})

CommentSchema.virtual('creatorId', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

CommentSchema.virtual('eventId', {
    localField: 'eventId',
    foreignField: 'id',
    ref: 'Event',
    justOne: true
})