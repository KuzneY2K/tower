import { Schema } from "mongoose";

export const EventSchema = new Schema({

    // populate
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    capacity: { type: Number, required: true, maxlength: 100, minlength: 1 },
    name: { type: String, required: true, maxlength: 32, minlength: 1 },
    description: { type: String, required: true, maxlength: 1000, minlength: 16 },
    coverImg: { type: String, required: true, default: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
    location: { type: String, required: true, minlength: 5, maxlength: 32 },
    // Change to true later
    startDate: { type: Date, required: false },
    isCanceled: { type: Boolean, default: false, required: true },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true }

}, { timestamps: true, toJSON: { virtuals: true } })

EventSchema.virtual('creator', {
    ref: 'Account',
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true
})

EventSchema.virtual('ticketCount', {
    ref: 'Ticket',
    localField: '_id',
    foreignField: 'eventId',
    count: true
})