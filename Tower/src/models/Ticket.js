import { Schema } from "mongoose";

export const TicketSchema = new Schema({
    // eventId will be populated into the .create
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    // eventName will be populated into the .create
    eventName: { type: Schema.Types.String, ref: 'Event', required: true },
    // accountId will be put into event.body.accoundId = request.userInfo.id
    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

TicketSchema.virtual('eventId', {
    localField: 'eventId',
    foreignField: 'id',
    ref: 'Event',
    justOne: true
})

TicketSchema.virtual('eventName', {
    localField: 'eventName',
    foreignField: 'eventName',
    ref: 'Event',
    justOne: true
})

TicketSchema.virtual('accountId', {
    localField: 'accountId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})