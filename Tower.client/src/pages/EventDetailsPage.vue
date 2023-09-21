<template>
    <section class="row p-0 m-0 d-flex flex-column flex-md-row align-items-md-start align-items-center container-fluid position-relative" v-if="event">
        <!-- MODAL -->
        <!-- Button trigger modal -->
        <div class="btn-container p-0 m-0 position-absolute">
    <button type="button" class="btn comment-btn btn-grad p-0 m-0 px-4 py-2 border border-1 border-white elevation-5 position-fixed" data-bs-toggle="modal" data-bs-target="#commentModal">
      <i class="mdi mdi-pencil-plus fs-2"></i>
    </button></div>

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
                <button type="submit" class="btn btn-grad px-4 py-2 border border-1 border-dark elevation-5">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
        <!-- MODAL -->
        <div class="col-6 p-0 m-0 d-flex flex-column align-items-md-start align-items-center">
            <div class="div pattern-diagonal-lines-sm gray-lighter text-black p-0 m-0 coverImgContainer mt-3">
                <img :src="event.coverImg" alt="event coverimg" class="coverImg ms-md-5 mt-md-5 border border-2 border-black elevation-5 ">
            </div>
        </div>
        <div class="col-6 p-0 m-0 d-flex flex-column align-items-md-start align-items-center info-col">
            <div class="p-0 m-0 d-flex flex-row justify-content-md-end">
                <h2 class="p-0 m-0 me-md-5 mt-md-5 my-3">{{event.name}}</h2>
            </div>
            <h3 class="p-0 m-0 me-md-5 mt-0 my-3">{{event.location}}</h3>
            <h5 class="mt-md-5 me-md-5 p-0 m-0 w-100 my-3 desc">{{ event.description }}</h5>
            <hr>
            <h4 class="p-0 m-0 me-md-5 mt-md-2 my-3">Tickets left: {{event.capacity}}</h4>
            <h3 class="mt-md-2 ms-md-5">STARTING at {{ event.startDate }}</h3>
            <div class="col-12 p-0 m-0 d-flex flex-row justify-content-center attendeeContainer mt-md-3">
            <AttendeeBubble v-for="comment in comments" :key="comment" :comment="comment" />
        </div>
            <hr>
    </div>
</section>
<section class="row p-0 m-0 comments mb-5 mt-4" v-for="comment in comments" :key="comment">
    <div class="col-md-6 col-10 p-0 m-0 d-flex flex-column align-items-start align-items-md-start ms-md-5 mx-auto position-relative">
        <button class="btn btn-secondary rounded position-absolute deleteBtn" @click.prevent="deleteComment(comment.id)">X</button>
        <div class="div p-0 m-0 commentContainer border border-2 border-black p-4 w-100 rounded">
            <div class="div comment-head p-0 m-0 d-flex flex-row align-items-center">
                <img :src="comment.creator.picture" alt="" class="rounded rounded-pill" height="60">
            <h5 class="p-0 m-0 ms-4">{{ comment.creator.name }} says...</h5>
            </div>
        <p class="p-0 m-0 mt-4 fs-5"><i class="mdi mdi-format-quote-open"></i>{{comment.body}}<i class="mdi mdi-format-quote-close"></i></p>
        </div>
    </div>
</section>
</template>

<script>
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import {eventsService} from '../services/EventsService.js'
import { computed, onMounted, ref, } from 'vue';
import { AppState } from '../AppState.js';
import {commentsService} from '../services/CommentsService.js'
import { logger } from '../utils/Logger.js';

    export default {
        setup(){
            const route = useRoute()

            let reqBody = ref({})

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

            onMounted(() => {
                getEventById()
                getEventComments()
            })
            return {
                event: computed(() => AppState.activeEvent),
                comments: computed(() => AppState.eventComments),
                getEventComments,
                reqBody,

                // delete comment
                async deleteComment(commentId){
                    try {
                            await commentsService.deleteComment(commentId)
                    } catch (error) {
                        Pop.error(error)
                    }
                },

                async createComment(){
                    try {
                        await commentsService.createComment(route.params.eventId, reqBody.value)
                        reqBody.value = {}
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

.comment-btn{
    bottom: 2rem;
    right: 2rem;
}

.deleteBtn{
    right: 0rem;
    top: 0rem;
}

.attendee-container{
    height: 10rem;
    overflow: scroll !important;
}

.commentContainer{
    height: 12rem;
    overflow: scroll;
}

.coverImgContainer{
    transform:translate(3rem, 0rem);
}

.commentContainer::-webkit-scrollbar {
    display: none;
}

.coverImg{
    height: 25rem;
        transform:translate(0.5rem, 1rem);
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