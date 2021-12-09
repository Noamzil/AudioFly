<template>
  <section class="gerne-page">
    <h1 class="genre-name">{{ genre }}</h1>
    <div class="popular-playlists">
      <div class="playlists-info">
        <h2>Popular playlists</h2>
        <h3>SEE ALL</h3>
      </div>
      <div v-for="playlist in playlistsByGenre" :key="playlist">
        <genre-playlist-list :currPlaylist="playlist" />
      </div>
    </div>
    <div class="new-releases">
      <div class="playlists-info">
        <h2>New releases</h2>
        <h3>SEE ALL</h3>
      </div>
    </div>
    <pre>{{ playlistsByGenre }}</pre>
  </section>
</template>

<script>
import genrePlaylistList from "./genre-playlist-list.cmp.vue";
export default {
  name: "genre-page",
  data() {
    return {};
  },
  computed: {
    genre() {
      return this.$route.params.genreType;
    },
    playlistsByGenre() {
      console.log(this.$store.getters.playlists);
      var playlistByGenre = [];
      this.$store.getters.playlists.forEach((playlist) => {
        console.log(playlist);
        if (playlist.tags.includes(this.genre)) playlistByGenre.push(playlist);
      });
      return playlistByGenre;
    },
  },
  components: {
    genrePlaylistList,
  },
};
</script>
