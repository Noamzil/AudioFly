<template>
  <section v-if="playlist" >
      <h1>{{playlist.name}}</h1>
      <img :src="playlist.playlistImg" class="genre-playlists-img">
  </section>
</template>

<script>
export default {
  name: "genre-playlist-preview",
  props: ["playlist"],
  data() {
    return {
      highlight: false,
    };
  },
  created() {
  },
  methods: {
    goToPlaylist() {
      this.$router.push("/playlist/" + this.playlist._id);
    },
  },
  computed: {
    isHighlight() {
      return this.highlight ? "highlight" : "";
    },
  },
};
</script>

