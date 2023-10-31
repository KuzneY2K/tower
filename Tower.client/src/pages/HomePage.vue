<template>
  <section class="row p-0 m-0">
  <CreateEvent v-if="account.id" />
</section>
  <div class="accordion accordion-flush" id="categoriesAccordion">
    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingOne">
        <button class="accordion-button collapsed px-5" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
          Click To See All Event Categories
        </button>
      </h2>
      <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#categoriesAccordion">


        <section class="row p-0 m-0 main-row mt-3">
          <!-- <spline :scene=YOUR_SCENE_OBJECT_HERE /> -->
          <div>
                  <div class="col-12 p-0 m-0 d-flex flex-row align-items-center justify-content-start">
                  <ul class="list-group list position-relative d-flex flex-row flex-wrap justify-content-center align-items-center text-center ms-md-5">
                    <li class="list-item li-o me-md-4 me-3 px-4 py-3 rounded fs-5 elevation-2" @click="filter = 'concert'">
                      Concerts
                    </li>
                    <li class="list-item li-t mb-md-5 me-md-4 px-4 py-3 rounded fs-5 elevation-2" @click="filter = 'convention'">
                      Conventions
                    </li>
                    <li class="list-item li-th me-md-4 mt-3 me-3 px-4 py-3 rounded fs-5 elevation-2" @click="filter = 'sport'">
                      Sports
                    </li>
                    <li class="list-item li-f mb-md-5 me-md-4 mt-3 px-4 py-3 rounded fs-5 elevation-2" @click="filter = 'digital'">
                      Digital
                    </li>
                    <li class="list-item li-z me-md-4 mt-md-3 mt-3 me-3 px-4 py-3 rounded fs-5 elevation-2 elevation-2" @click="filter = ''">
                        All
                      </li>
                  </ul>
                  </div>
          </div>
        </section>

      </div>
    </div>
  </div>
  <section class="row p-0 m-0 mb-5">
    <!-- <h3 class="p-0 m-0 ms-4 mt-3">Sorted by: Newest Events</h3> -->
    <EventCard :event="event" v-for="event in events" :key="event" class="animate__animated animate__fadeIn"/>
  </section>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import {eventsService} from '../services/EventsService.js'
import AOS from 'aos';

export default {
  setup() {
    const driver = window.driver.js.driver

    const homeTour = driver({
      showProgress: true,
      allowClose: true,
      onCloseClick: () => { 
        localStorage.setItem('needsTour', false)
        homeTour.destroy()
      },
      steps: [
      { element: '#categoriesAccordion', popover: { title: 'Welcome to Tower Events! 🎉', description: 'Click this drop down button to view all categories!', side: "bottom", align: "center" } },
      { element: '#eventCard', popover: { title: 'Event Cards. 🎴', description: 'Clicking event cards flips them over and shows you a short description on the event!', side: "bottom", align: "center" }, onNextClick: () => {
        localStorage.setItem('needsTour', false)
        homeTour.moveNext()
      } },
      { element: '#eventCard', popover: { title: 'Thats it! 🪩', description: 'This is the end of this tour. Click done when you are ready.', side: "bottom", align: "center" } },
      ]
    })

    function giveTour(){
      homeTour.drive()
    }

    async function getEvents(){
      try {
        await eventsService.getEvents()
      } catch (error) {
        Pop.error(error)
      }
    }
    
    const filter = ref('')

    onMounted(()=> {
      // setTimeout(giveTour, 1500)
      // Pop.toast('Clicking on event cards reveals their description!')
      getEvents()
      AOS.init()
    })
    return {
      filter,
      account: computed(() => AppState.account),
      events: computed(() => {
        if(!filter.value){
          return AppState.events.reverse()
        } else {
          return AppState.events.filter(e => e.type == filter.value)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

.list-item{

    background-color: transparent !important;
    list-style-type: none;
}
.li-o{
    top: 0rem;
    border: 1px solid black;
    width: 10rem;
}

.li-t{
    top: 10rem;
    border: 1px solid black;
        width: 10rem;
}

.li-th{
    top: 20rem;
    border: 1px solid black;
        width: 10rem;
}

.collapse {
  overflow-y: hidden;
}
.li-f{
    top: 30rem;
    border: 1px solid black;
        width: 10rem;
}

.li-z{
    top: 30rem;
    border: 1px solid black;
        width: 10rem;
}

.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
