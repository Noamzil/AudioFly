<template>
  <header class="main-header">
    <section class="left-side-header">
      <div>
        <button @click="nextHistory" :class="isNext ? 'active' : ''">
          <svg role="img" focusable="false" viewBox="0 0 24 24">
            <polyline points="16 4 7 12 16 20" fill="none"></polyline>
          </svg>
        </button>
        <button @click="prevHistory" :class="isPrev ? 'active' : ''">
          <svg role="img" focusable="false" viewBox="0 0 24 24">
            <polyline points="8 4 17 12 8 20" fill="none"></polyline>
          </svg>
        </button>
      </div>
      <div class="input-container" v-if="route==='/search'">
        <svg role="img" class="search-icon-input" viewBox="0 0 24 24">
          <path
            d="M16.736 16.262A8.457 8.457 0 0019 10.5a8.5 8.5 0 10-3.779 7.067l4.424 5.18 1.521-1.299-4.43-5.186zM10.5 17C6.916 17 4 14.084 4 10.5S6.916 4 10.5 4 17 6.916 17 10.5 14.084 17 10.5 17z"
          ></path>
        </svg>
        <form @submit.prevent="search" action="">
          <input type="search" v-model="searchTxt" placeholder="Search Songs" />
        </form>
      </div>
    </section>
    <div class="login-container">
      <template v-if="!$store.getters.realUser">
      <button @click="openModal('login-modal')" class="login-btn">Login</button>
      </template>
    <user-nav @logOut="$emit('logOut')"></user-nav>
    </div>
  </header>
</template>

<script>
import userNav from './user-nav.cmp.vue';
import {eventBus} from '../services/event-bus.cmp.js'
export default {
  name: 'app-header',
  data() {
    return {
      isNext: false,
      isPrev: false,
      searchTxt: '', 
    };
  },
  methods: {
    nextHistory() {
      this.isNext = !this.isNext;
      console.log('Going to the next page on your history');
    },
    prevHistory() {
      this.isPrev = !this.isPrev;
      console.log('Going to the previous page on your history');
    },
    search() {
      const key = this.searchTxt;
      this.$store.dispatch({ type: 'search', key });
    },
    openModal(type) {
      eventBus.$emit('openModal', type)
    }
  },
  computed:{
    route() {
      return this.$route.path
    }
  },
  components: {
    userNav,
  },
};
</script>
