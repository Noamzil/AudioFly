<template>
  <section v-if="playlist">
    <div class="img-div">
      <img :src="playlist.playlistImg" class="genre-playlists-img" />
    </div>
    <h1>{{ playlist.name }}</h1>
    <h2 class="playlist-desc">{{ playlist.discription }}</h2>
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
  created() {},
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

