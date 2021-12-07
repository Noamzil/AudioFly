<template>
  <section
    v-if="this.$store.getters.songsRes.length"
    class="songs-res-container"
  >
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
      <div v-for="song in songsRes" :key="song.id" class="song-res">
        <img :src="song.img" @click="playSong(song)" />
        <h3>{{ song.title }}</h3>
        <button class="heart-search-res">
          <svg role="img" viewBox="0 0 16 16">
            <path fill="none" d="M0 0h16v16H0z"></path>
            <path
              d="M13.797 2.727a4.057 4.057 0 00-5.488-.253.558.558 0 01-.31.112.531.531 0 01-.311-.112 4.054 4.054 0 00-5.487.253c-.77.77-1.194 1.794-1.194 2.883s.424 2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 002.726 0l4.435-5.195a4.052 4.052 0 001.195-2.883 4.057 4.057 0 00-1.196-2.883z"
            ></path>
          </svg>
        </button>
        <small v-if="isFetch">{{ song.duration }}</small>
      </div>
    </div>
  </section>
</template>

<script>
import { apiService } from '../services/api.service.js';
import { utilService } from '../services/util.service.js';

export default {
  name: 'search-res',
  data() {
    return {
      videosLength: null,
      isFetch: false,
    };
  },
  computed: {
    songsRes() {
      this.isFetch = false;
      var songs = this.$store.getters.songsRes;
      var times = [];
      songs.forEach((song) => {
        apiService.getVideoLength(song.youtubeId).then((length) => {
          var totalseconds = utilService.ISOStringToSec(length);
          song.duration = this.writeTime(totalseconds);
          times.push({ id: song.youtubeId, str: this.writeTime(totalseconds) });
          if (times.length === songs.length) this.isFetch = true;
        });
      });
      this.videosLength = times;
      return songs;
    },
    topSong() {
      return this.$store.getters.songsRes.splice(0, 1)[0];
    },
  },
  methods: {
    playSong(song) {
      console.log(song, 'in searchRes cmp');
      this.$store.commit({ type: 'playSong', song });
    },
    writeTime(time) {
      return utilService.secToStr(time);
    },
  },
  components: {},
};
</script>
