export class Event{
    constructor(data){
        this.id = data.id
        this.creatorId = data.creatorId
        this.capacity = data.capacity
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.startDate = new Date(data.startDate).toLocaleDateString([], {
            hour: '2-digit', minute: '2-digit'
        })
        this.isCanceled = data.isCanceled
        this.type = data.type
        this.creator = data.creator
        this.ticketCount = data.ticketCount
    }
}