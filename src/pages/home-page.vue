<template>
  <section class="home-page">
      <h1 class="greeting-home-page">{{greeting}}</h1>
    <playlists-list :playlists="playlists"></playlists-list>
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