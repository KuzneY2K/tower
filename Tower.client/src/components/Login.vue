<template>
  <span class="navbar-text d-flex flex-row justify-content-center">
    <button class="btn btn-grad nav-btn text-white selectable text-uppercase p-0 m-0 px-4 py-2 me-4 border-white border elevation-5" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>
    <div v-else>
      <div class="dropdown my-2 my-lg-0 p-0 m-0 animate__animated animate__fadeIn">
        <div type="button" class="border-0 selectable no-select p-0 m-0 " data-bs-toggle="dropdown" aria-expanded="false">
          <div v-if="account.picture || user.picture">
            <img :src="account.picture || user.picture" alt="account photo" height="60" width="60" class="rounded rounded-pill border border-2 elevation-5 p-0 m-0 pfp" />
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-lg-end dropdown-menu-start p-0 mb-3" aria-labelledby="authDropdown">
          <div class="list-group ">
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item dropdown-item list-group-item-action">
                Manage Account
              </div>
            </router-link>
            <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithRedirect()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-btn {
  width: 8rem;
}

.pfp{
  object-fit: cover;
}

.dropdown-menu{
  z-index: 5 !important;
}
</style>
