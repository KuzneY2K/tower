<template>
  <section class="row p-0 m-0 main-row">
    <div class="col-12 p-0 m-0 d-flex flex-row align-items-center justify-content-start">
      <Categories />
    </div>
  </section>
  <section class="row p-0 m-0">
    <EventCard />
  </section>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';

export default {
  setup() {
    return {
      events: computed(() => AppState.events)
    }
  }
}
</script>

<style scoped lang="scss">
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
