export class Comment{
    constructor(data){
        this.id = data.id
        this.creatorId = data.creatorId
        this.eventId = data.eventId
        this.body = data.body
        this.isAttending = data.isAttending
        this.creator = data.creator
        this.event = data.even
        this.createdAt = new Date(data.createdAt).toLocaleDateString([], {
            hour: '2-digit', minute: '2-digit'
        })
    }
}