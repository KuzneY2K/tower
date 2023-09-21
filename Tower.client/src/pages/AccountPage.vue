<template>
  <div class="p-0 m-0">
    <div class="accountInfo text-center p-0 m-0">
      <hr>
    <img class="rounded" :src="account.picture" alt="" data-bs-toggle="modal" data-bs-target="#pfpModal" />
    <h1>Welcome {{ account.name }}</h1>
    <p>{{ account.email }}</p>
    <h3>My Events</h3>
    </div>
    <hr>
    <EventCard :event="ticket.event" v-for="ticket in myTickets" :key="ticket.id" />


    <!-- MODAL  -->
    <div class="modal fade" id="pfpModal" tabindex="-1" aria-labelledby="pfpModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="pfpModalLabel">Edit Profile</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form action="">
            <!-- FORM -->
            <div class="form-group">
              <!-- EDIT PFP -->
              <label for="picture">Update profile picture URL</label>
              <input type="text" class="form-control" id="picture" name="picture">
            </div>
            <button type="button" class="btn btn-primary mt-3">Save changes</button>
          </form>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<!-- GET TIX BY ACCOUNT -->
<!-- api/account/tickets -->
<!-- reference comments by account -->

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import { ticketsService } from '../services/TicketsService.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
// import { useRoute } from 'vue-router';
export default {
  setup() {

      async function getAccountTickets() {
        try {
          await ticketsService.getAccountTickets()
          logger.log(AppState.myTickets)
            } catch (error) {
              Pop.error(error)
            }
            }

            onMounted(()=> {
              getAccountTickets()
            })
    return {
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      myTickets: computed(() => AppState.myTickets),
      myEvents: computed(() => AppState.myTickets.event),
      getAccountTickets
    }
  }
}
</script>

<style lang="scss" scoped>
hr{
  
  border: 0;
  height: 3px;
  width: 75%;
  background-color: black;
  position: relative;
  margin: 20px auto;

}
</style>
