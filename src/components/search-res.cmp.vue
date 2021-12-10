<template>
  <section
    v-if="this.$store.getters.songsRes.length"
    class="flex songs-res-container"
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
    <div class="flex songs-res" v-if="this.$store.getters.songsRes">
      <div v-for="song in songsRes" :key="song.id" class="flex song-res">
        <img :src="song.img" @click="playSong(song)" />
        <h3>{{ song.title }}</h3>

        <div class="heart-container">
          <button
            @click="toggleLikeSong(song)"
            class="like-btn fa-heart"
            :class="isSongLikedCheck(song) ? 'fas btn-liked' : 'far'"
          ></button>
        </div>
        <small v-if="isFetch">{{ song.duration }}</small>
      </div>
    </div>
  </section>
</template>

<script>
import { apiService } from "../services/api.service.js";
import { utilService } from "../services/util.service.js";

export default {
  name: "search-res",
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
      console.log(song, "in searchRes cmp");
      this.$store.commit({ type: "playSong", song });
    },
    writeTime(time) {
      return utilService.secToStr(time);
    },
    toggleLikeSong(song) {
      const userLiked = this.$store.getters.user.liked.song;
      const isLiked = userLiked.findIndex(
        (currSong) => currSong.youtubeId === song.youtubeId
      );
      this.$emit("toggleLikeSong", song);
    },
    isSongLikedCheck(song) {
      const userLiked = this.$store.getters.user.liked.song;
      const isLiked = userLiked.findIndex(
        (currSong) => currSong.youtubeId === song.youtubeId
      );
      return isLiked > -1 ? true : false;
    },
  },
  components: {
  },
};
</script>
