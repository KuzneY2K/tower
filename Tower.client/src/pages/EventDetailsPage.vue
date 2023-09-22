<template>
    <section class="row p-0 m-0 d-flex flex-column flex-md-row align-items-md-start align-items-center container-fluid position-relative" v-if="event && !event.isCanceled">
        <!-- MODAL -->
        <!-- Button trigger modal -->
        <div class="btn-container p-0 m-0 position-absolute">
    <button v-if="account.id" type="button" class="btn comment-btn btn-grad p-0 m-0 px-4 py-2 border border-1 border-white elevation-5 position-fixed" data-bs-toggle="modal" data-bs-target="#commentModal" title="Comment">
      <i class="mdi mdi-pencil-plus fs-2"></i>
    </button></div>
    <div class="btn-container p-0 m-0 position-absolute" v-if="capacity - ticketCount > 0">
        <div class="tixcontainer p-0 m-0" v-if="tickets">
        <button v-if="account.id && !hasTicket" type="button" class="btn attend-btn btn-grad p-0 m-0 px-4 py-2 border border-1 border-white elevation-5 position-fixed" @click.prevent="createTicket()" title="Attend Event">
          <i class="mdi mdi-ticket fs-2"></i>
        </button></div></div>
            <div class="btn-container p-0 m-0 position-absolute">
            <div class="delcontainer p-0 m-0" v-if="event.creatorId == account.id">
            <button type="button" class="btn del-btn btn-grad p-0 m-0 px-4 py-2 border border-1 border-white elevation-5 position-fixed" @click.prevent="cancelEvent()" title="Cancel Event">
              <i class="mdi mdi-close-thick fs-2"></i>
            </button></div></div>

    <!-- Modal -->
    <div class="modal fade" id="commentModal" tabindex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="commentModalLabel">Create Comment</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body mb-3">
            <!-- FORM -->
            <form class="w-100" @submit.prevent="createComment()">
                <!-- MESSAGE INPUT -->
                <div class="mb-3">
                    <label for="body" class="form-label">What's on your mind?</label>
                    <input type="text" v-model="reqBody.body" class="form-control p-3" id="body" required minlength="1"
                        maxlength="250">
                </div>
                <!-- SUBMIT FORM -->
                <button type="submit" class="btn btn-grad px-4 py-2 border border-1 border-white elevation-5">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
        <!-- MODAL -->
        <div class="col-6 p-0 m-0 d-flex flex-column align-items-md-start align-items-center">
            <div class="div pattern-diagonal-lines-sm gray-lighter text-black p-0 m-0 coverImgContainer mt-3 animate__animated animate__fadeInLeft">
                <img :src="event.coverImg" alt="event coverimg" class="coverImg ms-md-5 mt-md-5 border border-2 border-black elevation-5 animate__animated animate__fadeIn">
            </div>
        </div>
        <div class="col-6 p-0 m-0 d-flex flex-column align-items-md-start align-items-center info-col">
            <div class="p-0 m-0 d-flex flex-row justify-content-md-end">
                <h2 class="p-0 m-0 me-md-5 mt-md-5 my-3 animate__animated animate__fadeInLeftBig">{{event.name}}</h2>
            </div>
            <h3 class="p-0 m-0 me-md-5 mt-0 my-3 animate__animated animate__fadeInRightBig">{{event.location}}</h3>
            <h5 class="p-0 m-0 me-md-5 mt-0 my-3 animate__animated animate__fadeInDownBig">Event created by: {{event.creator.name}}</h5>
            <h5 class="mt-md-5 me-md-5 p-0 m-0 w-100 my-3 desc animate__animated animate__fadeInUpBig">{{ event.description }}</h5>
            <hr>
            <h4 class="p-0 m-0 me-md-5 mt-md-2 my-3 animate__animated animate__fadeInDownBig" :key="event.ticketCount">Tickets left: {{capacity - ticketCount}}</h4>
            <h3 class="mt-md-2 ms-md-5 animate__animated animate__fadeInUpBig">STARTING at {{ event.startDate }}</h3>
            <div class="col-12 p-0 m-0 d-flex flex-row justify-content-center attendeeContainer mt-md-3">
            <AttendeeBubble v-for="ticket in tickets" :key="ticket.id" :ticket="ticket" />
        </div>
            <hr>
    </div>
</section>
<section class="row p-0 m-0 comments mb-5 mt-4" v-for="comment in comments" :key="comment">
    <div class="col-md-6 col-10 p-0 m-0 d-flex flex-column align-items-start align-items-md-start ms-md-5 mx-auto position-relative" v-if="event && !event.isCanceled">
        <button class="btn btn-secondary rounded position-absolute deleteBtn" @click.prevent="deleteComment(comment.id)" v-if="comment.creator.id == account.id">X</button>
        <div class="div p-0 m-0 commentContainer border border-2 border-black p-4 w-100 rounded">
            <div class="div comment-head p-0 m-0 d-flex flex-row align-items-center">
                <img :src="comment.creator.picture" alt="" class="rounded rounded-pill commentpic" height="60" width="60">
                <div class="div comment-head-info">
            <h5 class="p-0 m-0 ms-4">{{ comment.creator.name }} says...</h5>
            <span class="p-0 m-0 ms-4 mt-1">{{ comment.createdAt }}</span>
            </div>
            </div>
        <p class="p-0 m-0 mt-4 fs-5"><i class="mdi mdi-format-quote-open"></i>{{comment.body}}<i class="mdi mdi-format-quote-close"></i></p>
        </div>
    </div>
</section>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import Pop from '../utils/Pop.js';
import {eventsService} from '../services/EventsService.js'
import { computed, onMounted, ref, } from 'vue';
import { AppState } from '../AppState.js';
import {commentsService} from '../services/CommentsService.js'
import { logger } from '../utils/Logger.js';
import {ticketsService} from '../services/TicketsService.js'
import { Modal } from 'bootstrap';

    export default {
        setup(){
            const route = useRoute()
            const router = useRouter()

            let reqBody = ref({})
            let ticketBody = ref({})

            async function getEventById(){
                try {
                    await eventsService.getEventById(route.params.eventId)
                    // logger.log(AppState.activeEvent)
                } catch (error) {
                    Pop.error(error)
                }
            }

            async function getEventComments(){
                try {
                    await commentsService.getEventComments(route.params.eventId)
                } catch (error) {
                    Pop.error(error)
                }
            }

            async function getEventTickets(){
                try {
                    await ticketsService.getEventTickets(route.params.eventId)
                } catch (error) {
                    Pop.error(error)
                }
            }

            onMounted(() => {
                getEventById()
                getEventComments()
                getEventTickets()
            })

            // if event is cancelled disable ticket creation
            return {
                event: computed(() => AppState.activeEvent),
                comments: computed(() => AppState.eventComments),
                tickets: computed(() => AppState.eventTickets),
                account: computed(() => AppState.account),
                capacity: computed(() => AppState.activeEvent.capacity),
                ticketCount: computed(() => AppState.activeEvent.ticketCount),
                hasTicket: computed(() => AppState.eventTickets.find(ticket => ticket.accountId == AppState.account.id)),
                getEventComments,
                getEventTickets,
                reqBody,
                ticketBody,

                // cancel event
                async cancelEvent(){
                    try {
                        if(await Pop.confirm('Are you sure you want to cancel this event?')){
                            await eventsService.cancelEvent(route.params.eventId)
                            router.push({ name: 'Home', path: '/' })
                            Pop.toast('Event Cancelled.')
                        }
                    } catch (error) {
                        Pop.error(error)
                    }
                },

                // delete comment
                async deleteComment(commentId){
                    try {
                        if(await Pop.confirm('Delete Comment?')){
                            await commentsService.deleteComment(commentId) 
                            Pop.toast('Comment Removed.')              
                        } else {
                            Pop.toast('Deletion cancelled.')
                        }
                    } catch (error) {
                        Pop.error(error)
                    }
                },

                async createComment(){
                    try {
                        reqBody.value.eventId = route.params.eventId
                        reqBody.value.event = this.event
                        await commentsService.createComment(reqBody.value)
                        Modal.getOrCreateInstance('#commentModal').hide()
                        reqBody.value = {}
                    } catch (error) {
                        Pop.error(error)
                    }
                },

                async createTicket(){
                    try {
                        ticketBody.value.eventId = route.params.eventId
                        ticketBody.value.event = this.event
                        ticketBody.value.accountId = this.account.id
                        ticketBody.value.profile = this.account
                        await ticketsService.createTicket(ticketBody.value)
                        ticketBody.value = {}
                        getEventById()
                    } catch (error) {
                        Pop.error(error)
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

.btn-container{
  bottom: 2rem;
  right: 1rem;
  z-index: 5;
}

.commentpic{
    object-fit: cover;
}

.comment-btn{
    bottom: 2rem;
    right: 2rem;
}

.attend-btn{
    bottom: 2rem;
    right: 7.5rem;
}

.del-btn{
    bottom: 6.5rem;
    right: 2rem;
}

.deleteBtn{
    right: 1rem;
    top: 1rem;
}

.attendeeContainer{
    height: 10rem;
    overflow: scroll !important;
    // width: 25rem !important;
}

.attendeeContainer::-webkit-scrollbar {
    display: none;
}

.commentContainer{
    height: 12rem;
    overflow: scroll;
}

.coverImgContainer{
    transform:translate(3rem, 0rem) !important;
}

.commentContainer::-webkit-scrollbar {
    display: none;
}

.coverImg{
    height: 25rem;
    width: 40rem;
    object-fit: cover;
        transform:translate(0rem, 1rem);
}

hr{
  
  border: 0;
  height: 3px;
  width: 75%;
  background-color: black;
  position: relative;
  margin: 20px auto;

}

@media (max-width: 900px){
    .coverImgContainer{
        overflow: hidden;
    transform:translate(0rem, 0rem);
}

.attendeeContainer{
    height: 10rem;
    overflow: scroll !important;
    width: 25rem !important;
}

.coverImg{
    overflow: hidden;
    height: 15rem;
        transform:translate(0rem, 0rem);
}

.info-col{
    width: 100%;
    padding-left: 1rem !important;
    padding-right: 1rem !important;
}

.desc {
    overflow: scroll;
    height: 10rem;
    font-size: 1rem !important;
}
}

</style>