<template>
  <section class="gerne-page">
    <h1 class="genre-name">{{ genre }}</h1>
    <div class="popular-playlists">
      <div class="playlists-info">
        <h2>Popular playlists</h2>
        <h3>SEE ALL</h3>
        <!-- <genre-songs-list /> -->
      </div>
    </div>
    <div class="new-releases">
      <div class="playlists-info">
        <h2>New releases</h2>
        <h3>SEE ALL</h3>
      </div>
    </div>
    <pre>{{playlistsByGenre}}</pre>
  </section>
</template>

<script>
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
      const playlists = this.$store.getters.playlists
      var playlistByGenre = playlists.find(playlist => playlist.tags.includes(this.genre))
      return playlistByGenre
    },
  },
};
</script>
