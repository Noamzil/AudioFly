<template>
  <section class="home-page">
    <div :class="tag" class="div-for-style"></div>
    <div class="loading-container" v-if="isLoading">
      <img class="loading-gif" :src="require('../assets/loader.gif')" />
    </div>
    <template v-if="!isLoading">
      <h1 class="greeting-home-page">{{ greeting }}</h1>
      <playlists-list
        :playlistsList="playlists"
        :userLiked="userLiked"
      ></playlists-list>
    </template>
  </section>
</template>

<script>
import playlistsList from '../components/playlists-list.cmp.vue';
export default {
  data() {
    return {
      isLoading: false,
      tags: null,
      tag: null,
      tagInterval: null,
    };
  },
  created() {
    this.isLoading = true;
    this.tags = this.$store.getters.tags.slice(0, 19);
    var idx = Math.floor(Math.random() * 19);
    this.tag = this.tags[idx];
    var currHomeTag = this.tag;
    this.$store.commit({ type: 'setCurrHomeTag', currHomeTag });
    this.tagInterval = setInterval(() => {
      var idx = Math.floor(Math.random() * 19);
      this.tag = this.tags[idx];
      currHomeTag = this.tag;
      this.$store.commit({ type: 'setCurrHomeTag', currHomeTag });
    },6000);
  },
  mounted() {
    this.isLoading = false;
  },
  computed: {
    playlists() {
      return this.$store.getters.playlists;
    },
    userLiked() {
      return this.$store.getters.user.liked;
    },
    greeting() {
      var currHr = new Date().getHours();
      if (currHr < 12) return 'Good morning';
      else if (currHr < 18) return 'Good afternoon';
      else return 'Good evening';
    },
    // tag() {
    //   setInterval(() => {
    //     console.log(this.$store.getters.tags);
    //     var idx = Math.floor(Math.random() * 24);
    //     console.log(this.$store.getters.tags[idx]);
    //     return this.$store.getters.tags[idx];
    //   }, 3000);
    //   var idx = Math.floor(Math.random() * 24);
    //   console.log(this.$store.getters.tags[idx]);
    //   return this.$store.getters.tags[idx];
    // },
  },
  destroyed() {
    clearInterval(this.tagInterval);
  },
  components: {
    playlistsList,
  },
};
</script>

<style></style>
