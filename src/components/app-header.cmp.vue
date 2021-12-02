<template>
  <header class="main-header">
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
    <form role="search" @submit.prevent="search">
      <input type="search" v-model="searchTxt" />
    </form>
    
    <user-nav></user-nav>
  </header>
</template>

<script>
import userNav from "./user-nav.cmp.vue";
export default {
  name: "app-header",
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
      console.log("Going to the next page on your history");
    },
    prevHistory() {
      this.isPrev = !this.isPrev;
      console.log("Going to the previous page on your history");
    },
    search() {
      const key = this.searchTxt
      this.$store.dispatch({type: 'search', key})
    }
  },
  components: {
    userNav,
  },
};
</script>

