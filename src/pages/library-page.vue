<template>
  <section class="library-page">
    <h2 class="library-header">Library</h2>
    <div class="library-main">
      <div class="library-row1">
        <router-link class="router-link-liked-song" to="/liked-songs">
          <div class="liked-songs-container">
            <div class="track-tilte">
              <p v-for="song in songs" :key="song.id">
                {{ song.title }}
              </p>
            </div>
            <div class="tracks-info">
              <h2>Liked Songs</h2>
              <p>{{ songs.length }} liked songs</p>
            </div>
          </div>
        </router-link>
        <div class="recently-add-container playlists-list">
          <h3 class="list-title">Recently added</h3>
          <ul class="playlists-container recently-added">
            <li v-for="playlist in playlists" :key="playlist._id">
              <playlist-preview :currPlaylist="playlist"></playlist-preview>
            </li>
          </ul>
        </div>
      </div>
      <div class="playlists-list">
        <h1>Most liked</h1>
        <ul class="playlists-container">
          <li v-for="playlist in playlists" :key="playlist._id">
            <playlist-preview :currPlaylist="playlist"></playlist-preview>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import playlistPreview from '../components/playlist-preview.cmp.vue';
export default {
  name: 'library-page',
  data() {
    return {};
  },
  created() {},
  computed: {
    songs() {
      return this.$store.getters.userLikedSongs;
    },
    playlists() {
      return this.$store.getters.playlists;
    },
  },
  components: {
    playlistPreview,
  },
};
</script>
