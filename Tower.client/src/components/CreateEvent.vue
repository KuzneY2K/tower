<template>
    <!-- Button trigger modal -->
    <div class="createBtnContainer">
        <button type="button" class="btn btn-grad position-absolute p-0 m-0 px-4 py-2 elevation-5 createBtn position-fixed border border-1 border-white" data-bs-toggle="modal" data-bs-target="#eventModal">
      Launch Event
        </button>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="eventModalLevel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="eventModalLevel">New Event</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
                        <form class="w-100" @submit.prevent="createEvent()">
                    <!-- Name Input -->
                        <div class="mb-3">
                            <label for="name" class="form-label">Event Name</label>
                            <input type="text" v-model="eventBody.name" class="form-control" id="name" required minlength="1"
                                maxlength="32">
                        </div>
                    <!-- End name -->
                    <!-- Description Input -->
                        <div class="mb-3">
                            <label for="location" class="form-label">Event Location</label>
                            <input type="text" v-model="eventBody.location" class="form-control" id="location" required minlength="1"
                                maxlength="200">
                        </div>
                    <!-- End desc -->
                    <!-- event type Input -->
                            <div class="mb-3">
                                <label for="type" class="form-label">Event type</label>
                                <select class="form-select" v-model="eventBody.type" aria-label="Default select example" id="type" required>
      <option value="concert">Concert</option>
      <option value="convention">Convention</option>
      <option value="sport">Sport</option>
      <option value="digital">Digital</option>
    </select>
                            </div>
                    <!-- End desc -->
                    <!-- Description Input -->
                    <div class="mb-3">
                        <label for="description" class="form-label">Event Description</label>
                        <input type="text" v-model="eventBody.description" class="form-control p-3" id="description" required minlength="1"
                            maxlength="1000">
                    </div>
                    <!-- End desc -->
                    <!-- Image Input -->
                        <div class="mb-3">
                            <label for="coverImg" class="form-label">Event Image Url</label>
                            <input type="url" v-model="eventBody.coverImg" class="form-control" id="coverImg" required minlength="1">
                        </div>
                        <!-- End image -->
                    <!-- Date Input -->
                        <div class="mb-3">
                            <label for="startDate" class="form-label">Start Date</label>
                            <input type="datetime-local" data-date-format="YYYY MM DD" v-model="eventBody.startDate" class="form-control" id="startDate" required>
                        </div>
                        <!-- End date -->
                                            <!-- Date Input -->
                            <div class="mb-3">
                                <label for="capacity" class="form-label">Event Capacity</label>
                                <input type="number" v-model="eventBody.capacity" class="form-control" id="capacity" required min="1">
                            </div>
                            <!-- End date -->
                        
                    <button type="submit" class="btn btn-grad px-4 py-2 border border-1 border-white elevation-5">Submit</button>
                    </form>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>
    
</template>

<script>
import { ref } from 'vue';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';
import { useRouter } from 'vue-router';
import { Modal } from 'bootstrap';

    export default {
        setup(){
            let eventBody = ref({})
            let router = useRouter()
            return{
                eventBody,
                
                async createEvent(){
                    try {
                        let newEvent = await eventsService.createEvent(eventBody.value)
                        eventBody.value = {}
                        // Modal.getOrCreateInstance('#eventModal').hide() ADD CLASS HIDDEN TO MODAL TO HIDE 
                        router.push({ name: 'Event Details', params: { eventId: newEvent } })
                    } catch (error) {
                        Pop.error(error)
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

.createBtnContainer{
    z-index: 5;
}

.createBtn{
    right: 2rem;
    bottom: 2rem;
}

</style>