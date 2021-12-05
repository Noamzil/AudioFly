<template>
  <section class="playlists-list">
      <h1 class="playlist-category">Popular</h1>
      <ul class="playlists-container">
          <li v-for="playlist in populatPlaylists" :key="playlist._id">
              <playlist-preview :currPlaylist="playlist"></playlist-preview>
          </li>
      </ul>
      <h1 class="playlist-category">Stassions</h1>
      <ul class="playlists-container">
          <li v-for="playlist in stassions" :key="playlist._id">
              <playlist-preview :currPlaylist="playlist"></playlist-preview>
          </li>
      </ul>
      <h1 class="playlist-category">New</h1>
      <ul class="playlists-container">
          <li v-for="playlist in newPlaylists" :key="playlist._id">
              <playlist-preview :currPlaylist="playlist"></playlist-preview>
          </li>
      </ul>
      <h1 class="playlist-category">Back to last point</h1>
      <!-- <ul class="playlists-container">
          <li v-for="playlist in playlists" :key="playlist._id">
              <playlist-preview :currPlaylist="playlist"></playlist-preview>
          </li>
      </ul> -->
  </section>
</template>

<script>
import playlistPreview from './playlist-preview.cmp.vue'
export default {
name: 'playlistsList',
props: ['playlistsList'],
created() {
    // console.log(this.playlists);
},
computed: {
    userPlaylists() {

    },
    populatPlaylists() {
        var playlists = this.playlistsList.filter(playlist => playlist.type === 'playlist')
        playlists.sort((a, b) => a.likes - b.likes)
        return playlists
    },
    newPlaylists() {
        var playlists = this.playlistsList.filter(playlist => playlist.type === 'playlist')
        playlists.sort((a, b) => b.createdAt - a.createdAt)
        return playlists
    },
    stassions() {
        var stassions = this.playlistsList.filter(playlist => playlist.type === 'stassion')
        stassions.sort((a, b) => a.likes - b.likes)
        return stassions    
        }

},
components: {
    playlistPreview
},
}
</script>
