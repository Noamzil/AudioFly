<template>
  <section v-if="this.$store.getters.songsRes.length" class="songs-res-container">
    <!-- <h1>Top result</h1> -->
    <!-- <h1>Songs</h1> -->
    <div class="top-res" v-if="topSong">
      <img :src="topSong.img" />
      <h1>{{ topSong.title }}</h1>
      <button class="play-top-song-btn" @click="playSong(topSong)">
        <svg role="img" viewBox="0 0 24 24">
          <polygon
            points="21.57 12 5.98 3 5.98 21 21.57 12"
            fill="currentColor"
          ></polygon>
        </svg>
      </button>
    </div>
    <div class="songs-res" v-if="this.$store.getters.songsRes">
      <div v-for="(song, index) in songsRes" :key="song.id" class="song-res">
        <img :src="song.img" @click="playSong(song)" />
        <h3>{{ song.title }}</h3>
        <small>heart</small>
        <small>{{ videosLength[index] }}</small>
      </div>
    </div>

    <!-- <h1 v-if="songsRes">{{songsRes}}</h1> -->
  </section>
</template>

<script>
import { apiService } from '../services/api.service.js';
export default {
  name: 'search-res',
  data() {
    return {
      videosLength: null,
    };
  },
  computed: {
    songsRes() {
      var songs = this.$store.getters.songsRes;
      console.log(songs);
      var times = [];
      songs.forEach((song) => {
        apiService.getVideoLength(song.id).then((length) => {
          var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
          var hours = 0,
            minutes = 0,
            seconds = 0,
            totalseconds;

          if (reptms.test(length)) {
            var matches = reptms.exec(length);
            if (matches[1]) hours = Number(matches[1]);
            if (matches[2]) minutes = Number(matches[2]);
            if (matches[3]) seconds = Number(matches[3]);
            totalseconds = hours * 3600 + minutes * 60 + seconds;
          }
          times.push(this.getTimeStr(totalseconds));
        });
      });

      this.videosLength = times;
      console.log(times);
      return songs;
    },
        topSong() {
      return this.$store.getters.songsRes.splice(0, 1)[0];
    },
  },
  methods: {
    playSong(song) {
      this.$store.commit({ type: 'unMute' });
      this.$store.commit({type: 'toggleAutoplay'})
      this.$store.commit({ type: 'playSong', song });
    },
    getTimeStr(time) {
      var sec_num = parseInt(time, 10); 
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      var seconds = sec_num - hours * 3600 - minutes * 60;

      if (seconds < 10) {
        seconds = '0' + seconds;
      }

      if (hours === 0) {
        return minutes + ':' + seconds;
      }

      return hours + ':' + minutes + ':' + seconds;
    },

  },
};
</script>
