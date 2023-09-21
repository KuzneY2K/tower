<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
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
// import { useRoute } from 'vue-router';
export default {
  setup() {

      async function getAccountTickets() {
        try {
          await ticketsService.getAccountTickets()
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
      getAccountTickets
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
