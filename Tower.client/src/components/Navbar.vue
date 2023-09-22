<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-transparent p-0 m-0 py-3 px-3 py-md-5 px-md-5 mt-4">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-row align-items-center justify-content-center animate__animated animate__jackInTheBox">
        <img alt="logo" src="https://i.imgur.com/Xj5cvHh.png" height="60" class="" />
                      <a class="nav-brand nav-title p-0 m-0 fs-2 ms-2 text-dark" href="#">TOWER</a>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-md-end" id="navbarText">
      <ul class="navbar-nav me-md-4 d-flex flex-row justify-content-center">
        <li class="animate__animated animate__fadeIn">
          <router-link :to="{ name: 'Home' }" class="btn btn-grad nav-btn text-white selectable text-uppercase p-0 m-0 px-4 py-2 me-4 border-white border elevation-5">
              Events
          </router-link>
        </li>
                <li class="animate__animated animate__fadeIn">
            <router-link :to="{ name: 'Account' }" class="btn btn-grad nav-btn text-white selectable text-uppercase p-0 m-0 px-4 py-2 border-white border elevation-5">
                Account
            </router-link>
          </li>
        <!-- <li>
          <router-link :to="{ name: 'About' }" class="btn btn-grad nav-btn text-white selectable text-uppercase p-0 m-0 px-4 py-2 border-white border elevation-5">
            About
          </router-link>
        </li> -->
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

.navbar-toggler{
  border: 1px solid black;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%2825, 0, 00, 500.100%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
}


@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
