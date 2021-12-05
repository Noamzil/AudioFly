<template>
  <section class="home-page">
      <h1 class="greeting-home-page">{{greeting}}</h1>
    <playlists-list :playlistsList="playlists" :userLiked="userLiked"></playlists-list>
  </section>
</template>

<script>
import playlistsList from "../components/playlists-list.cmp.vue";
export default {
  created() {
    // console.log(this.playlists);
  },
  computed: {
    playlists() {
      return this.$store.getters.playlists;
    },
    userLiked() {
      return this.$store.getters.user.liked;
    },
    greeting() {
      var currHr = new Date().getHours()
      if (currHr < 12) return 'Good morning'
      else if (currHr < 18) return 'Good afternoon'
      else return 'Good evening'
    },
  },
  components: {
    playlistsList,
  },
};
</script>

<style>
</style>