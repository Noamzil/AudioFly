<template>
<section>
  <div class="user-nav" :class="isNav ? 'clicked' : '' " @click="isNav=!isNav">
        <svg role="img" viewBox="0 0 16 16"><path d="M3 6l5 5.794L13 6z"></path></svg>
        <h3>{{username}}</h3>
        <avatar :size="35" :username="username"></avatar>
  </div>
  <nav class="user-nav-modal" v-if="isNav">
      <router-link to="/">Account <svg role="img" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M15 7V1H9v1h4.29L7.11 8.18l.71.71L14 2.71V7h1zM1 15h12V9h-1v5H2V4h5V3H1v12z" clip-rule="evenodd"></path></svg></router-link>
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
