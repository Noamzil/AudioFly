<template>
  <section class="gerne-page">
    <h1 class="genre-name">{{ genre }}</h1>
    <h2>Popular playlists</h2>
    <div class="playlist-genre-container">
      <ul class="playlists-container genre">
        <li v-for="playlist in playlistsByGenre" :key="playlist._id">
          <!-- <genre-playlist-list :playlist="playlist" class="genre-playlist-list"/> -->
          <playlist-preview :currPlaylist="playlist"></playlist-preview>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import genrePlaylistList from "./genre-playlist-list.cmp.vue";
import playlistPreview from '../components/playlist-preview.cmp.vue'
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
      // console.log(this.$store.getters.playlists);
      var playlistByGenre = [];
      this.$store.getters.playlists.forEach((playlist) => {
        if (playlist.tags && playlist.tags.includes(this.genre))
          playlistByGenre.push(playlist);
      });
      return playlistByGenre;
    },
  },
  components: {
    genrePlaylistList,
    playlistPreview
  },
};
</script>

<style>

</style>