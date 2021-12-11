<template>
  <div :class="tag" class="playlist-header-container">
    <div class="playlist-description">
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
          @change="imgInput"
          hidden
        />
        <div v-if="isHoverImg" class="img-awesome flex">
          <p class="fas fa-pencil-alt pencil"></p>
          <p>Choose photo</p>
        </div>
        <div
          v-if="!currPlaylist.playlistImg"
          :class="{ hidden: isHoverImg }"
          class="fab fa-itunes-note img-awesome note"
        ></div>

        <img
          :class="{ hide: isHoverImg }"
          v-else
          :src="currPlaylist.playlistImg"
          @click="playlistEdit = !playlistEdit"
        />
      </label>
      <div class="playlist-edit-container"></div>
      <div class="description-txt">
        <h2>{{currPlaylist.type}}</h2>
        <h1>{{ currPlaylist.name }}</h1>
        <p>{{ currPlaylist.discription }}</p>
        <div class="playlist-songs-details">
          <a>{{ currPlaylist.createdBy.username }}</a>
          <span class="dot"> • </span>
          <span
            >{{ currPlaylist.songs.length }} songs <span class="dot"> • </span>
            {{ albumTime }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { utilService } from '../../services/util.service.js';

export default {
  name: 'playlist-description',
  props: ['currPlaylist'],
  data() {
    return {
      playlistEdit: false,
      isHoverImg: false,
    };
  },
  methods: {
    imgInput(ev) {
      this.$emit('imgUpload', ev);
    },
  },

  computed: {
    albumTime() {
      var albumTime = '';
      var seconds = 0;
      this.currPlaylist.songs.forEach((song) => {
        var a = song.duration.split(':');
        seconds += +a[0] * 60 + +a[1];
      });
      albumTime = utilService.secToStr(seconds);
      return albumTime;
    },
    tag() {
      return this.$store.getters.currPlaylist.tags[0];
    },
  },
};
</script>
