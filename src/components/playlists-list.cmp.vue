<template>
  <section class="playlists-list">
      <h1 class="playlist-category">Popular</h1>
      <ul class="playlists-container">
          <li v-for="playlist in playlists" :key="playlist._id">
              <playlist-preview :currPlaylist="playlist"></playlist-preview>
          </li>
      </ul>
      <h1 class="playlist-category">Stassions</h1>
      <ul class="playlists-container">
          <li v-for="playlist in playlists" :key="playlist._id">
              <playlist-preview :currPlaylist="playlist"></playlist-preview>
          </li>
      </ul>
      <h1 class="playlist-category">New</h1>
      <ul class="playlists-container">
          <li v-for="playlist in playlists" :key="playlist._id">
              <playlist-preview :currPlaylist="playlist"></playlist-preview>
          </li>
      </ul>
      <h1 class="playlist-category">Back to last point</h1>
      <ul class="playlists-container">
          <li v-for="playlist in playlists" :key="playlist._id">
              <playlist-preview :currPlaylist="playlist"></playlist-preview>
          </li>
      </ul>
  </section>
</template>

<script>
import playlistPreview from './playlist-preview.cmp.vue'
export default {
name: 'playlistsList',
props: ['playlists'],
created() {
    // console.log(this.playlists);
},
components: {
    playlistPreview
},
}
</script>
