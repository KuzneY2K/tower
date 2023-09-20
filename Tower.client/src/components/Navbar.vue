<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-transparent p-0 m-0 py-5 px-5 mt-4">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-row align-items-center justify-content-center">
        <img alt="logo" src="https://i.imgur.com/Xj5cvHh.png" height="80" class="" />
                      <a class="nav-brand nav-title p-0 m-0 fs-1 ms-2 text-dark" href="#">TOWER</a>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarText">
      <ul class="navbar-nav me-4">
        <li>
          <router-link :to="{ name: 'Home' }" class="btn btn-grad nav-btn text-white selectable text-uppercase p-0 m-0 px-4 py-2 me-4 border-white border elevation-5">
              Home
          </router-link>
        </li>
                        <li>
              <router-link :to="{ name: 'Home' }" class="btn btn-grad nav-btn text-white selectable text-uppercase p-0 m-0 px-4 py-2 me-4 border-white border elevation-5">
                  Events
              </router-link>
            </li>
                <li>
            <router-link :to="{ name: 'Account' }" class="btn btn-grad nav-btn text-white selectable text-uppercase p-0 m-0 px-4 py-2 me-4 border-white border elevation-5">
                Account
            </router-link>
          </li>
        <li>
          <router-link :to="{ name: 'About' }" class="btn btn-grad nav-btn text-white selectable text-uppercase p-0 m-0 px-4 py-2 border-white border elevation-5">
            About
          </router-link>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import Login from './Login.vue';
export default {
  setup() {
    return {}
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.nav-btn {
  width: 8rem;
}


@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
