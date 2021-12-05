<template>
  <div class="playlist-content" v-if="playlist">
    <div
      class="song-container"
      v-for="(song, index) in playlist.songs"
      :key="song.youtubeId"
      @mouseover="hoverSongToogle(index, true)"
      @mouseleave="hoverSongToogle(index, false)"
    >
      <p v-if="!hoverSong[index]" class="index">{{ index + 1 }}</p>
      <button v-else @click="playSong(index)" class="play-btn">
        <svg role="img" viewBox="0 0 24 24">
          <polygon
            points="21.57 12 5.98 3 5.98 21 21.57 12"
            fill="currentColor"
          ></polygon>
        </svg>
      </button>
      <div class="song-details">
        <img class="song-img" :src="song.img" />
        <p>{{ song.title }}</p>
      </div>
      <a href="">Album name</a>

      <p>{{ song.addedAt }}</p>
      <div class="songOptions">
        <div class="heart-container">
          <section v-if="hoverSong[index]">
            <button
              @click="toogleLiked(index)"
              :class="{
                fas: currPlaylist.songs[index].isLike,
                far: !currPlaylist.songs[index].isLike,
                btnLiked: currPlaylist.songs[index].isLike,
              }"
              class="like-btn fa-heart"
            ></button>
          </section>
        </div>
        <p>{{ song.length }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { utilService } from '../../services/util.service.js';

export default {
  name: 'playlist-content',
  props: ['currPlaylist'],
  data() {
    return {
      hoverSong: [],
      liked: [],
      playlist: null,
    };
  },
  created() {
    this.playlist = JSON.parse(JSON.stringify(this.currPlaylist));
  },
  computed: {
    playlistTime() {
      return utilService.getTimeStr(this.currPlaylist.time);
    },
  },
  methods: {
    hoverSongToogle(idx, ishoverSong) {
      this.hoverSong.splice(idx, 1, ishoverSong);
    },
    playSong(idx) {
      var song = this.currPlaylist.songs[idx];
      this.$store.commit({ type: 'playSong', song });
    },
    toogleLiked(idx) {
      this.$emit('toogleSongIsLike', idx);
    },
  },
};
</script>
