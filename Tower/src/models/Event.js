import { Schema } from "mongoose";

export const EventSchema = new Schema({

    // populate
    creatorId: { type: Schema.Types.ObjectId, ref: 'creatorId', required: true },
    // populate
    creatorName: { type: Schema.Types.String, ref: 'Account', required: true },
    // populate
    creatorPicture: { type: Schema.Types.String, ref: 'Account', required: true },
    // Subtract from capacity
    ticketCount: { type: Schema.Types.Number, ref: 'Ticket', required: true, default: 0 },
    capacity: { type: Number, required: true, maxlength: 100, minlength: 1 },
    eventName: { type: String, required: true, maxlength: 32, minlength: 4 },
    eventDescription: { type: String, required: true, maxlength: 250, minlength: 16 },
    eventImg: { type: String, required: true, default: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
    location: { type: String, required: true, minlength: 5, maxlength: 32 },
    // Change to true later
    startDate: { type: Date, required: false },
    isCancelled: { type: Boolean, default: false },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true }

}, { timestamps: true, toJSON: { virtuals: true } })

EventSchema.virtual('eventCreatorId', {
    ref: 'Account',
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true
})

EventSchema.virtual('eventCreatorPicture', {
    ref: 'Account',
    localField: 'creatorPicture',
    foreignField: 'picture',
    justOne: true
})

EventSchema.virtual('eventCreatorName', {
    ref: 'Account',
    localField: 'creatorName',
    foreignField: 'name',
    justOne: true
})

EventSchema.virtual('eventTicketCount', {
    ref: 'Account',
    localField: 'ticketCount',
    // Pull account's ticket
    foreignField: 'id',
    // Should add up total tickets
    count: true
})