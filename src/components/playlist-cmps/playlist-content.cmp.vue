<template>
  <div class="playlist-content">
    <div
      class="song-container"
      v-for="(song, index) in playlist.songs"
      :key="song._id"
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
        <img
          class="song-img"
          :src="require('../../' + playlist.playlistImg + '.jpeg')"
        />
        <p>{{ song.name }}</p>
      </div>
      <a href="">Album name</a>
      <p>{{ playlist.createdAt }}</p>
      <p>{{ playlistTime }}</p>
      <!-- <p>CurrSong: {{this.$store.getters.currSong}}</p> -->
    </div>
  </div>
</template>

<script>
import { utilService } from '../../services/util.service.js';

export default {
  name: 'playlist-content',
  //   props: ['playlist'],
  data() {
    return {
      hover: [],
      playlist: {
        _id: 'pl101',
        type: 'playlist',
        playlistImg: 'assets/img/playlist-imgs/Rock&Roll',
        createdBy: 'Orly Amdadi',
        createdAt: 150245112,
        likes: 50,
        tags: ['rock', 'pop'],
        name: 'My PlayList',
        discription: 'loem empsum',
        time: 12252,
        songs: [
          {
            _id: 's101',
            name: 'All of Me',
          },
          {
            _id: 's102',
            name: "There's No Way Out of Here",
          },
        ],
      },
    };
  },
  created() {
    this.playlist.songs.forEach(() => {
      this.hover.push(false);
    });
  },
  computed: {
    playlistTime() {
      return utilService.getTimeStr(this.playlist.time);
    },
  },
  methods: {
    hoverToogle(idx, isHover) {
      this.hover.splice(idx, 1, isHover);
    },
    playSong(idx) {
      console.log(idx);
      console.log(`play `, this.playlist.songs[idx]);
      var song = this.playlist.songs[idx];
      console.log('currSong:', song);
      this.$store.commit({ type: 'playSong', song });
    },
  },
};
</script>
