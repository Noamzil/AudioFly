<template>
<section>
  <div class="user-nav" @click="isNav=!isNav">
        <svg role="img" viewBox="0 0 16 16"><path d="M3 6l5 5.794L13 6z"></path></svg>
        <h3>{{username}}</h3>
        <avatar :username="username"></avatar>
  </div>
  <nav class="user-nav-modal" v-if="isNav">
      <router-link to="/">Account</router-link>
      <router-link to="/">Profile</router-link>
      <router-link to="/">Log out</router-link>
  </nav>
  </section>
</template>

<script>
import avatar from 'vue-avatar'
export default {
    data() {
        return {
            username: 'Guest',
            isNav: false
        }
    },
    components: {
        avatar,
    }
}
</script>
