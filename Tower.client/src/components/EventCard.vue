<template>
        <div class="col-md-5 m-auto col-11 p-0 m-0 d-flex flex-column flex-wrap flex-md-row jusity-content-center" id="eventCard" title="Clicking on me reveals my description!">
          <div class="card-container event-card p-0 m-0 d-flex flex-column flex-wrap mt-3 flex-md-row jusity-content-center px-2 elevation-5 border border-2 border-dark " @click.stop="e => e.target.classList.toggle('active')" :style="{ backgroundImage: 'url(' + props.event.coverImg + ')'}">

            <div class="title-container p-0 m-0 click-thru text-white pattern-dots-lg gray-light pb-4 px-4">
              <h2 v-if="props.event?.isCanceled == false" class="text-white mt-4 event-title ">{{ props.event.name.toUpperCase() }} <br> <span class="fs-5">{{ props.event.location.toUpperCase() }}</span></h2>
              <h2 v-if="props.event?.isCanceled == true" class="text-white mt-4 text-danger event-title"><del>{{ props.event.name.toUpperCase() }}</del> <br>// Cancelled</h2>
              <h2 v-if="props.event.isCanceled == null">{{ props.event.name.toUpperCase() }} <br> <span class="fs-5">{{ props.event.location.toUpperCase() }}</span></h2>
            </div>
            
            <p class="mx-5 my-5 text-white event-desc mt-3 positon-absolute click-thru " >{{ props.event.description }}</p>
          </div>
          <!-- NO CANCEL -->
          <router-link :to="{name: 'Event Details', params: {eventId: props.event.id}}" v-if="props.event?.isCanceled == false" class="pattern-dots-lg gray-light text-white" id="eventDetailsBtn">
            <button class="btn btn-light mt-3 ms-3" v-if="props.event.isCanceled == false" title="Clicking on an event card reveals the event's description!">See Event Details</button>
          </router-link>
          <!-- CANCELLED -->
          <div class="div p-0 m-0 text-white">
          <button class="btn btn-light mt-3 ms-3" v-if="props.event.isCanceled == true" disabled>See Event Details</button>
          </div>
        </div>
</template>

<script>
import {Event} from '../models/Event.js'
import { Ticket } from '../models/Ticket.js';
    export default {
      props: {event: {type: [Event, Object], required: true}},
        setup(props){
          const allCards = document.querySelectorAll('event-card')
          return{
            props,
            allCards
          }
        }
    }
</script>

<style lang="scss" scoped>

.event-title{
  text-shadow: 2px 2px 3px black;
}

.card-container{
  background-size: cover !important;
  background-position: center;
}

.event-card{
  width: 100%;
  height: 15rem;
  overflow: hidden !important;
  transform: rotateY(0deg);
  transition: transform ease-in-out .2s;
  
  >.title-container{
    // visibility: visible;
    opacity: 100;
    position: absolute;
    transition: opacity ease-in-out .2s;
  }
  
  >p{
    opacity: 0%;
    transform: rotateY(0deg);
    transition: opacity ease-in-out .2s, transform ease-in-out .2s;
    text-shadow: 1px 2px 7px black !important;
  }
}

.event-card.active {
  transform: rotateY(180deg);
    overflow: scroll !important;
  
  >.title-container{
    // visibility: hidden;
    opacity: 0;
    position: absolute;
  }
  >p{
    opacity: 100%;
      transform: rotateY(180deg);
  }
}

.click-thru{
  pointer-events: none;
}


.event-card::-webkit-scrollbar {
    display: none;
}

hr {
  width: 96%;               
  background-color:#ffffff;
  border: 1px solid white;
  height: 5px;
}

</style>