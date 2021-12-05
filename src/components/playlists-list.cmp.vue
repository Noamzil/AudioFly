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
      <h1 class="playlist-category">New</h1>
      <ul class="playlists-container">
          <li v-for="playlist in newPlaylists" :key="playlist._id">
              <playlist-preview :currPlaylist="playlist"></playlist-preview>
          </li>
      </ul>
      <h1 class="playlist-category">Back to last point</h1>
      <ul class="playlists-container">
          <li v-for="playlist in userPlaylists" :key="playlist._id">
              <playlist-preview :currPlaylist="playlist"></playlist-preview>
          </li>
      </ul>
  </section>
</template>

<script>
import playlistPreview from './playlist-preview.cmp.vue'
export default {
name: 'playlistsList',
props: ['playlistsList', 'userLiked'],
created() {
    // console.log(this.playlists);
},
computed: {
    userPlaylists() {
        var likedMini = this.userLiked.playlist
        const likedPlaylists = []
        likedMini.forEach(miniPL => {
            likedPlaylists.push(this.playlistsList.find(playlist => playlist._id === miniPL._id))
        })
        return likedPlaylists
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
    stations() {
        var stations = this.playlistsList.filter(playlist => playlist.type === 'station')
        stations.sort((a, b) => a.likes - b.likes)
        return stations    
        }

},
components: {
    playlistPreview
},
}
</script>
