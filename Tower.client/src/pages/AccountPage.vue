<template>
  <div class="p-0 m-0">
    <div class="accountInfo text-center p-0 m-0">
      <hr>
    <img class="rounded rounded-pill border border-2 border-dark elevation-5 p-0 m-0 pfp" :src="picture" alt="" height="250" width="250" data-bs-toggle="modal" data-bs-target="#pfpModal" />
    <h1 class="mt-3">Welcome {{ name }}</h1>
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
          <form @submit.prevent="editAccount()">
            <!-- FORM -->
            <!-- NAME -->
                        <div class="form-group">
                <label for="picture">Update profile name</label>
                <input v-model="dataBody.name" type="text" class="form-control" id="picture" name="picture" maxlength="16" required>
              </div>
            <!-- EDIT PFP -->
            <div class="form-group">
              <label for="picture">Update profile picture URL</label>
              <input v-model="dataBody.picture" type="text" class="form-control" id="picture" name="picture">
            </div>
            <!-- END PFP -->
            <button type="submit" class="btn btn-primary mt-3">Save changes</button>
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
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import { ticketsService } from '../services/TicketsService.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { accountService } from '../services/AccountService.js';
import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';
// import { useRoute } from 'vue-router';
export default {
  setup() {

    let dataBody = ref({})
    let router = useRouter()

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
      name: computed(() => AppState.account.name),
      picture: computed(() => AppState.account.picture),
      user: computed(() => AppState.user),
      myTickets: computed(() => AppState.myTickets),
      myEvents: computed(() => AppState.myTickets.event),
      getAccountTickets,
      dataBody,
      router,

      async editAccount(){
        await accountService.editAccount(dataBody.value)
        router.push({ name: 'Account', path: '/' })
        Modal.getOrCreateInstance('#pfpModal').hide()
        window.location.reload()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.pfp{
  object-fit: cover;
}

hr{
  
  border: 0;
  height: 3px;
  width: 75%;
  background-color: black;
  position: relative;
  margin: 20px auto;

}
</style>
