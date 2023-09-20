import { Schema } from "mongoose";

export const CommentSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    body: { type: String, required: true, maxlength: 500, minlength: 1 },
    isAttending: { type: Boolean, }
})

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: 'id',
    ref: 'Account',
    justOne: true
})

CommentSchema.virtual('event', {
    localField: 'eventId',
    foreignField: 'id',
    ref: 'Event',
    justOne: true
})