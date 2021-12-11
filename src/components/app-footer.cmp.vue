<template>
  <section>
    <section class="flex footer">
      <played-note-details @likeSong="likeSong" @disLikeSong="disLikeSong" />
      <song-progress
        :currSong="currSong"
        @togglePlay="togglePlay"
        @startAt="startAt"
        @playNextSong="playNextSong"
        @shufflePlaylist="shufflePlaylist"
        @loopSong="loopSong"
      />
      <device-control @changeVolume="changeVolume" />
      
    </section>
    <div class="youtube-player">
      <youtube
        hidden
        :video-id="videoId"
        @playing="playing"
        ref="youtube"
      ></youtube>
    </div>
  </section>
</template>

<script>
import playedNoteDetails from './footer-cmps/played-note-details.cmp.vue';
import songProgress from './footer-cmps/song-progress.cmp.vue';
import deviceControl from './footer-cmps/device-control.cmp.vue';
import youtubePlayer from './footer-cmps/new-youtube.cmp.vue';
import { eventBus } from '../services/event-bus.cmp.js';

export default {
  name: 'app-footer',
  data() {
    return {
      videoId: null,
    };
  },
  created() {
    this.videoId = this.$store.getters.currSong.youtubeId;
  },
  methods: {
    likeSong() {
      const song = this.$store.getters.currSong;
      this.$store.dispatch({ type: 'addLike', entity: song });
    },
    disLikeSong() {
      const song = this.$store.getters.currSong;
      this.$store.dispatch({ type: 'removeLike', entity: song });
    },
    playing() {
      this.playVideo();
    },
    togglePlay() {
      if (this.isPlaying) this.pauseVideo();
      else this.playVideo();
    },
    playVideo() {
      this.$store.commit('continueSong');
      this.player.playVideo();
    },
    pauseVideo() {
      this.$store.commit('stopSong');
      this.player.pauseVideo();
    },
    playNextSong() {
      this.player.loadVideoById(this.$store.getters.currSong.youtubeId, 0);
    },
    loopSong(song) {
      this.player.loadVideoById(song.youtubeId, 0);
    },
    async changeVolume(ev) {
      await this.player.setVolume(ev);
    },
    startAt(ev) {
      // console.log('im at start at', ev);
      this.player.loadVideoById(this.$store.getters.currSong.youtubeId, ev);
    },
    shufflePlaylist() {
      this.$store.commit('shufflePlaylist');
      eventBus.$emit('showMsg', 'The playlist have been shuffled');
    },
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
    currSong() {
      return this.$store.getters.currSong;
    },
    isPlaying() {
      return this.$store.getters.isSongOn;
    },
  },
  watch: {
    // currSong() {
    //   this.currSong= this.$store.getters.currSong;
    // },
  },
  components: {
    playedNoteDetails,
    songProgress,
    deviceControl,
    youtubePlayer,
  },
};
</script>

<style lang="scss" scoped>
.youtube-player {
  position: absolute;
  z-index: -100;
  margin-left: 400px;
}
</style>
