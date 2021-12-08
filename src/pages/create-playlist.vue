<template>
  <section class="create-playlist">
    <div class="flex playlist-description">
      <label class="img-edit-container" for="file-uplaod">
        <input
          type="file"
          id="file-uplaod"
          accept="image/png, image/jpeg"
          @change="imgInput"
          hidden
        />
        <div class="fab fa-itunes-note img-awesome note"></div>
      </label>
      <div class="description-txt">
        <h2>Playlist</h2>
        <h1>My playlist #{{ getPlaylistsAmount }}</h1>
        <p>{{ getUser }}</p>
      </div>
    </div>
    <div class="playlist-page">
      <playlist-linear> </playlist-linear>
      <!-- add events and emits  like the playlist page-->
    </div>
  </section>
</template>

<script>
import songPreview from '../components/playlist-cmps/song-preview.cmp.vue';
import playlistLinear from '../components/playlist-cmps/playlist-linear.cmp.vue';

export default {
  name: 'create-playlist',
  data() {
    return {};
  },
  methods: {
    imgInput(ev) {
      this.$emit('imgUpload', ev);
    },
    imgUpload(fileUploadEv) {
      console.log(fileUploadEv);
      //   const img = fileUploadEv.target.files[0];
      //   const reader = new FileReader();
      //   reader.readAsDataURL(img);
      //   reader.onload = (ev) => {
      //     this.currPlaylist.playlistImg = ev.target.result;
      //     const playlist = this.currPlaylist;
      //     this.$store.dispatch({ type: 'updatePlaylist', playlist });
      //   };
    },
  },
  computed: {
    getPlaylistsAmount() {
      return this.$store.getters.user.playlists.length + 1;
    },
    getUser() {
      return this.$store.getters.user.fullName;
    },
  },
  components: {
    songPreview,
    playlistLinear,
  },
};
</script>

<style></style>
