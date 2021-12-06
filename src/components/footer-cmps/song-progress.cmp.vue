<template>
  <div class="song-progress">
    <div class="player-control-btns">
      <div class="controlls-left">
        <button>
          <svg role="img" viewBox="0 0 16 16">
            <path
              d="M4.5 6.8l.7-.8C4.1 4.7 2.5 4 .9 4v1c1.3 0 2.6.6 3.5 1.6l.1.2zm7.5 4.7c-1.2 0-2.3-.5-3.2-1.3l-.6.8c1 1 2.4 1.5 3.8 1.5V14l3.5-2-3.5-2v1.5zm0-6V7l3.5-2L12 3v1.5c-1.6 0-3.2.7-4.2 2l-3.4 3.9c-.9 1-2.2 1.6-3.5 1.6v1c1.6 0 3.2-.7 4.2-2l3.4-3.9c.9-1 2.2-1.6 3.5-1.6z"
            ></path>
          </svg>
        </button>
        <button @click="prevSong">
          <svg role="img" viewBox="0 0 16 16">
            <path d="M13 2.5L5 7.119V3H3v10h2V8.881l8 4.619z"></path>
          </svg>
        </button>
      </div>
      <button v-if="!isSongPlaying" class="play-btn" @click="togglePlay">
        <svg role="img" viewBox="0 0 16 16">
          <path d="M4.018 14L14.41 8 4.018 2z"></path>
        </svg>
      </button>
      <button v-else class="play-btn" @click="togglePlay">
        <svg role="img" viewBox="0 0 16 16">
          <path fill="none" d="M0 0h16v16H0z"></path>
          <path d="M3 2h3v12H3zm7 0h3v12h-3z"></path>
        </svg>
      </button>
      <div class="controllers-right">
        <button @click="nextSong">
          <svg role="img" viewBox="0 0 16 16">
            <path d="M11 3v4.119L3 2.5v11l8-4.619V13h2V3z"></path>
          </svg>
        </button>
        <button>
          <svg role="img" viewBox="0 0 16 16">
            <path
              d="M5.5 5H10v1.5l3.5-2-3.5-2V4H5.5C3 4 1 6 1 8.5c0 .6.1 1.2.4 1.8l.9-.5C2.1 9.4 2 9 2 8.5 2 6.6 3.6 5 5.5 5zm9.1 1.7l-.9.5c.2.4.3.8.3 1.3 0 1.9-1.6 3.5-3.5 3.5H6v-1.5l-3.5 2 3.5 2V13h4.5C13 13 15 11 15 8.5c0-.6-.1-1.2-.4-1.8z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="playback-bar">
      <div class="progress-time-start">
        <p>{{ currTimeStr }}</p>
      </div>
      <div
        @mouseover="isHover = true"
        @mouseleave="isHover = false"
        class="slider-container"
      >
        <input
          :style="progressPercentStr"
          @input="changeTime"
          v-model="currTime"
          type="range"
          min="0"
          :max="songLength"
          class="slider"
        />
      </div>
      <div class="progress-time-end">
        <p>{{ songLengthStr }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from '../../services/api.service.js';
import { utilService } from '../../services/util.service.js';

export default {
  name: 'song-progress',
  props: [`currSong`],
  data() {
    return {
      currTime: 0,
      isHover: false,
      currTimeStr: '',
      songLengthStr: '',
      songLength: null,
      progressPercent: 0,
    };
  },
  async created() {
    var lengthStr = await apiService.getVideoLength(this.currSong.youtubeId);
    this.songLength = this.ISOStringToSec(lengthStr);
    this.currTimeStr = this.secToStr(this.currTime);
    this.songLengthStr = this.secToStr(this.songLength);
    this.$emit('togglePlay');
  },
  methods: {
    async songLengthfunc() {
      var lengthStr = await apiService.getVideoLength(this.currSong.youtubeId);
      this.songLength = this.ISOStringToSec(lengthStr);
    },
    changeTime() {
      this.currTimeStr = this.secToStr(this.currTime);
      this.progressPercent = (this.currTime / this.songLength) * 100;
      var sec = this.currTime;
      this.$emit('startAt', sec);
    },
    secToStr(time) {
      return utilService.secToStr(time);
    },
    ISOStringToSec(str) {
      return utilService.ISOStringToSec(str);
    },
    togglePlay() {
      this.$emit('togglePlay');
    },
    nextSong() {
      var song;
      const currPlaylist = this.$store.getters.currPlaylist;
      var idx = currPlaylist.songs.findIndex(
        (song) => song.youtubeId === this.currSong.youtubeId
      );
      if (idx === currPlaylist.songs.length - 1) song = currPlaylist.songs[0];
      else song = currPlaylist.songs[idx + 1];
      this.$store.commit({ type: 'playSong', song });
    },
    prevSong() {
      var song;
      const currPlaylist = this.$store.getters.currPlaylist;
      var idx = currPlaylist.songs.findIndex(
        (song) => song.youtubeId === this.currSong.youtubeId
      );
      if (idx === 0) song = currPlaylist.songs[currPlaylist.songs.length - 1];
      else song = currPlaylist.songs[idx - 1];
      this.$store.commit({ type: 'playSong', song });
    },
  },
  computed: {
    progressPercentStr() {
      return {
        background: !this.isHover
          ? `linear-gradient(90deg, #b3b3b3 ${this.progressPercent}% , #535353 ${this.progressPercent}%)`
          : `linear-gradient(90deg, #1db954 ${this.progressPercent}% ,#535353 ${this.progressPercent}%)`,
      };
    },
    songTimeStr() {
      var time = this.songLength;
      return utilService.secToStr(time);
    },
    isSongPlaying() {
      return this.$store.getters.isSongOn;
    },
  },
  watch: {
    async currSong() {
      this.lengthStr = await apiService.getVideoLength(this.currSong.youtubeId);
      this.songLength = this.ISOStringToSec(this.lengthStr);
      this.currTimeStr = this.secToStr(this.currTime);
      this.songLengthStr = this.secToStr(this.songLength);
      this.$emit('playNextSong');
    },
  },
};
</script>
