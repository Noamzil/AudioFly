<template>
  <section>
    <div
      class="user-nav"
      :class="isNav ? 'clicked' : ''"
      @click="isNav = !isNav"
    >
      <svg role="img" viewBox="0 0 16 16">
        <path d="M3 6l5 5.794L13 6z"></path>
      </svg>
      <h3>{{ user.username }}</h3>
      <img v-if="user.imgUrl" class="user-avatar" :src="user.imgUrl" />
      <div v-else class="user-avatar">
        <span>{{ firstLetter }}</span>
      </div>
    </div>
    <nav class="user-nav-modal" v-if="isNav" ref="modal">
      <router-link to="/"
        >Account
        <svg role="img" viewBox="0 0 16 16">
          <path
            fill-rule="evenodd"
            d="M15 7V1H9v1h4.29L7.11 8.18l.71.71L14 2.71V7h1zM1 15h12V9h-1v5H2V4h5V3H1v12z"
            clip-rule="evenodd"
          ></path></svg
      ></router-link>
      <router-link to="/">Profile</router-link>
      <button class="log-out-btn" @click="$emit('logOut')" v-if="$store.getters.realUser">
        Log out</button>
    </nav>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.getters.user,
      isNav: false,
      modal: document.querySelector('.user-nav-modal')
    };
  },
  created() {
    window.onclick = ev => {
      if (this.isNav) return 
      if(ev.target !== this.modal)
      this.isNav = false;
    }
  },
  computed: {
    firstLetter() {
      return this.user.username[0].toUpperCase();
    },
  },
  watch: {
    '$store.getters.user'() {
      this.user = this.$store.getters.user;
    },
  },
  components: {},
};
</script>
