<template>
  <section class="gerne-page">
    <h1 class="genre-name">{{ genre }}</h1>
    <h2>Popular playlists</h2>
    <div class="playlist-genre-container">
      <ul>
        <li v-for="playlist in playlistsByGenre" :key="playlist._id">
          <genre-playlist-list :playlist="playlist" class="genre-playlist-list"/>
        </li>
      </ul>
    </div>
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
        if (playlist.tags && playlist.tags.includes(this.genre))
          playlistByGenre.push(playlist);
      });
      return playlistByGenre;
    },
  },
  components: {
    genrePlaylistList,
  },
};
</script>

<style>
.playlist-genre-container {
  /* background-color: aqua; */
  padding: 20px 0;
}
.playlist-genre-container ul {
  display: flex;
  width: 100%;
  gap: 30px;
  padding: 20px 0;
  flex-wrap: wrap;
}
.playlist-genre-container li {
  border-radius: 4px;
  background-color: #181818;
  width: 270px;
  height: 380px;
  padding: 15px;
}
.genre-playlists-img {
  height: 200px;
  width: 200px;
  margin-bottom: 10px;
  box-shadow: 1px 1px 8px 3px black;
  object-fit: cover;
}
.playlist-container {
  padding: 10px;
  height: 300px;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.3s;
}

.genre-playlist-list h1 {
  font-size: 24px;
}
</style>