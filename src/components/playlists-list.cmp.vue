<template>
  <section class="playlists-list">
    <h1 class="playlist-category">Popular</h1>
    <ul class="playlists-container">
      <li v-for="playlist in populatPlaylists" :key="playlist._id">
        <playlist-preview :currPlaylist="playlist"></playlist-preview>
      </li>
    </ul>
    <h1 class="playlist-category">Stations</h1>
    <ul class="playlists-container">
      <li v-for="playlist in stations" :key="playlist._id">
        <playlist-preview :currPlaylist="playlist"></playlist-preview>
      </li>
    </ul>
    <div v-if="userPlaylists.length">
    <h1 class="playlist-category">Liked Playlists</h1>
    <ul class="playlists-container">
      <li v-for="playlist in userPlaylists" :key="playlist._id">
        <playlist-preview :currPlaylist="playlist"></playlist-preview>
      </li>
    </ul>
    </div>
    <h1 class="playlist-category">New</h1>
    <ul class="playlists-container">
      <li v-for="playlist in newPlaylists" :key="playlist._id">
        <playlist-preview :currPlaylist="playlist"></playlist-preview>
      </li>
    </ul>
    <h1 class="playlist-category">New In Rock</h1>
    <ul class="playlists-container">
      <li v-for="playlist in rockPlaylists" :key="playlist._id">
        <playlist-preview :currPlaylist="playlist"></playlist-preview>
      </li>
    </ul>
    <h1 class="playlist-category">New In Pop</h1>
    <ul class="playlists-container">
      <li v-for="playlist in popPlaylists" :key="playlist._id">
        <playlist-preview :currPlaylist="playlist"></playlist-preview>
      </li>
    </ul>
  </section>
</template>

<script>
import playlistPreview from './playlist-preview.cmp.vue';

export default {
  name: 'playlistsList',
  props: ['playlistsList', 'userLiked'],
  created() {
    console.log(this.playlistsList);
  },
  computed: {
    userPlaylists() {
      var likedMini = this.userLiked.playlist;
      const likedPlaylists = [];
      likedMini.forEach((miniPL) => {
        likedPlaylists.push(
          this.playlistsList.find((playlist) => playlist._id === miniPL._id)
        );
      });
      return likedPlaylists.slice(0,8);
    },
    populatPlaylists() {
      var playlists = this.playlistsList.filter(
        (playlist) => playlist.type === 'playlist'
      );
      playlists.sort((a, b) => b.likes - a.likes);
      return playlists.slice(0,8);
    },
    newPlaylists() {
      var playlists = this.playlistsList.filter(
        (playlist) => playlist.type === 'playlist'
      );
      playlists.sort((a, b) => b.createdAt - a.createdAt);
      return playlists.slice(0,8);
    },
    stations() {
      var stations = this.playlistsList.filter(
        (playlist) => playlist.type === 'station'
      );
      stations.sort((a, b) => b.likes - a.likes);
      return stations.slice(0,8);
    },
    rockPlaylists() {
      var playlists = this.playlistsList.filter(playlist => {
        return playlist.tags ? 
        playlist.tags.includes('Rock') : 
        false;
        })
      return playlists.sort((a, b) => b.createdAt - a.createdAt).slice(0,8)
    },
    popPlaylists() {
      var playlists = this.playlistsList.filter(playlist => {
        return playlist.tags ? 
        playlist.tags.includes('Pop') : 
        false;
        })
      return playlists.sort((a, b) => b.createdAt - a.createdAt).slice(0,8)
    },

  },
  destroyed() {
    socketService.off('chat addMsg', this.addMsg);
  },
  components: {
    playlistPreview,
  },
};
</script>
