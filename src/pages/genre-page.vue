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
      var playlists = this.$store.getters.playlists
      if(this.genre === 'Stations') {
        var stations = playlists.filter(station => station.type === 'station')
        return stations
      } else if (this.genre === 'All'){
        playlists.sort((a, b) => b.likes - a.likes)
        return playlists
      } else if (this.genre === 'Liked') {
        const user = this.$store.getters.user
        var playlistsToShow = playlists.filter(playlist => user.liked.playlist.find(currPL => 
        currPL._id === playlist._id))
        var stations = playlists.filter(playlist => user.liked.station.find(station => 
        station._id === playlist._id))
        return [...playlistsToShow,...stations]
      } else {
      var playlistByGenre = [];
      this.$store.getters.playlists.forEach((playlist) => {
        if (playlist.tags && playlist.tags.includes(this.genre))
          playlistByGenre.push(playlist);
      });
      return playlistByGenre;
      }
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