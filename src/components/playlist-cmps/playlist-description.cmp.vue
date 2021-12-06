<template>
  <div class="playlist-description">
    <label for="file-uplaod">
      <input type="file" id="file-uplaod" accept="image/png, image/jpeg"
      @change="imgInput" hidden>
    <img :src="currPlaylist.playlistImg" @click="playlistEdit=!playlistEdit"/>
    </label>
    <div class="playlist-edit-container">

    </div>
    <div class="description-txt">
      <h2>Playlist</h2>
      <h1>{{ currPlaylist.name }}</h1>
      <p>{{ currPlaylist.discription }}</p>
      <p>Artists names in the album...</p>
      <div class="playlist-songs-details">
        <a>{{ currPlaylist.createdBy }}</a>
        <span class="dot"> • </span>
        <span>{{ currPlaylist.songs.length }} songs <span class="dot"> • </span> 00:00
          (cpmputed album time)</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'playlist-description',
  props: ['currPlaylist'],
  data() {
    return {
      playlistEdit: false,
    }
  },
  methods: {
    imgInput(ev) {
      this.$emit('imgUpload', ev)
    }
  }
};
</script>
