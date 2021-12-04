<template>
  <div class="playlist-content" v-if="playlist">
    <div
      class="song-container"
      v-for="(song, index) in playlist.songs"
      :key="song.youtubeId"
      @mouseover="hoverToogle(index, true)"
      @mouseleave="hoverToogle(index, false)"
    >
      <p v-if="!hover[index]" class="index">{{ index + 1 }}</p>
      <button v-else @click="playSong(index)" class="play-btn">
        <svg role="img" viewBox="0 0 24 24">
          <polygon
            points="21.57 12 5.98 3 5.98 21 21.57 12"
            fill="currentColor"
          ></polygon>
        </svg>
      </button>
      <div class="song-details">
        <img class="song-img" :src="playlist.playlistImg"/>
        <p>{{ song.title }}</p>
      </div>
      <a href="">Album name</a>
      <p>added at :{{ song.createdAt }}</p>
      <p> song length: {{ song.time }}</p>
      <!-- <p v-if="this.$store.getters.currSong">CurrSong: {{this.$store.getters.currSong}}</p> -->
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
      hover: [],
    };
  },
  created() {
    // this.playlist.songs.forEach(() => {
    //   this.hover.push(false);
    // });
    console.log(this.currPlaylist);
    this.playlist = JSON.parse(JSON.stringify(this.currPlaylist));
  },
  computed: {
    playlistTime() {
      return utilService.getTimeStr(this.currPlaylist.time);
    },
  },
  methods: {
    hoverToogle(idx, isHover) {
      this.hover.splice(idx, 1, isHover);
    },
    playSong(idx) {
      var song = this.currPlaylist.songs[idx];
      this.$store.commit({ type: 'playSong', song });
    },
  },
};
</script>
