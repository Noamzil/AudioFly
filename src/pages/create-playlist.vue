<template>
  <section class="create-playlist">
    <div class="flex playlist-description">
      <label
        @mouseover="isHoverImg = true"
        @mouseleave="isHoverImg = false"
        class="img-edit-container"
        for="file-uplaod"
      >
        <input
          type="file"
          id="file-uplaod"
          accept="image/png, image/jpeg"
          @change="imgUpload"
          hidden
        />
        <div v-if="isHoverImg" class="edit-img">
          <div class="img-awesome edit flex">
            <p class="fas fa-pencil-alt pencil"></p>
            <p>Choose photo</p>
          </div>
        </div>
        <div
          v-else-if="!currPlaylist.playlistImg"
          class="fab fa-itunes-note img-awesome note"
        ></div>
        <img
          v-else
          class="img-edit-container"
          :src="currPlaylist.playlistImg"
        />
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
    <playlist-content
      @toggleLikeSong="toggleLikeSong"
      :currPlaylist="currPlaylist"
    />
  </section>
</template>

<script>
import songPreview from '../components/playlist-cmps/song-preview.cmp.vue';
import playlistLinear from '../components/playlist-cmps/playlist-linear.cmp.vue';
import playlistContent from '../components/playlist-cmps/song-list.cmp.vue';
import { playlistService } from '../services/playlist.service.js';
import { uploadImg } from '../services/upload-service.js';

export default {
  name: 'create-playlist',
  data() {
    return {
      currPlaylist: {},
      isHoverImg: false,
    };
  },
  created() {
    this.currPlaylist = playlistService.getEmptyPlaylist();
    var user = this.$store.getters.user;
    this.currPlaylist.createdBy = { userName: user.userName, _id: user._id };
  },
  methods: {
    async imgUpload(fileUploadEv) {
      try {
        const res = await uploadImg(fileUploadEv);
        this.currPlaylist.playlistImg = res.url;
        const playlist = this.currPlaylist;
        this.$store.dispatch({ type: 'updatePlaylist', playlist });
      } catch (err) {
        console.log('Couls not upload image', err);
      }
    },
    async toggleLikeSong(song) {
      song.type = 'song';
      this.songToCheck = song;
      if (this.isSongLiked) {
        await this.$store.dispatch({ type: 'removeLike', entity: song });
      } else {
        await this.$store.dispatch({ type: 'addLike', entity: song });
      }
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
    playlistContent,
  },
};
</script>

<style></style>
