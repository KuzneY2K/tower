<template>
    <section class="row p-0 m-0 d-flex flex-column flex-md-row align-items-md-start align-items-center container-fluid" v-if="event">
        <div class="col-6 p-0 m-0 d-flex flex-column align-items-md-start align-items-center">
            <div class="div pattern-diagonal-lines-sm gray-lighter text-black p-0 m-0 coverImgContainer mt-3">
            <img :src="event.coverImg" alt="event coverimg" class="coverImg ms-md-5 mt-md-5 border border-2 border-black elevation-5 ">
        </div>
    </div>
    <div class="col-6 p-0 m-0 d-flex flex-column align-items-md-start align-items-center info-col">
        <div class="p-0 m-0 d-flex flex-row justify-content-md-end">
            <h2 class="p-0 m-0 me-md-5 mt-md-5 my-3">{{event.name}}</h2>
        </div>
        <h4 class="mt-md-5 me-md-5 p-0 m-0 w-100 my-3 desc">{{ event.description }}</h4>
        <hr>
        <h3 class="mt-md-2 ms-md-5">STARTING at {{ event.startDate }}</h3>
        <hr>
    </div>
</section>
<section class="row p-0 m-0 comments mb-5 mt-5" v-for="comment in comments" :key="comment.id">
    <div class="col-md-6 col-10 p-0 m-0 d-flex flex-column align-items-start align-items-md-start ms-md-5 mx-auto">
        <div class="div p-0 m-0 commentContainer border border-2 border-black p-4 w-100">
            <div class="div comment-head p-0 m-0 d-flex flex-row justify-content- align-items-center">
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
import { computed, onMounted, popScopeId } from 'vue';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import {commentsService} from '../services/CommentsService.js'

    export default {
        setup(){
            const route = useRoute()

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

                // delete comment
                async deleteComment(commentId){
                    try {
                        if(Pop.confirm('Delete comment?')){
                            await commentsService.deleteComment(commentId)
                        } else {
                            Pop.toast('Deletion cancelled.')
                        }
                    } catch (error) {
                        Pop.error(error)
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

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
        transform:translate(2rem, 2rem);
}

hr{
  
  border: 0;
  height: 3px;
  width: 75%;
  background-color: black;
  position: relative;
  margin: 30px auto;

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