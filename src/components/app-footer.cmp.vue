<template>
  <section>
    <section class="footer">
      <played-note-details />
      <song-progress @togglePlay="togglePlay" @startAt="startAt" />
      <device-control />
    </section>
    <div class="youtube-player">
      <button @click="getVolume">volume</button>
      <youtube :video-id="videoId" ref="youtube"></youtube>
    </div>
  </section>
</template>

<script>
import playedNoteDetails from './footer-cmps/played-note-details.cmp.vue';
import songProgress from './footer-cmps/song-progress.cmp.vue';
import deviceControl from './footer-cmps/device-control.cmp.vue';
import youtubePlayer from './footer-cmps/new-youtube.cmp.vue';

export default {
  name: 'app-footer',
  data() {
    return {
      videoId: null,
      isPlaying: false,
      songLength: 300,
    };
  },
  created() {
    this.videoId = this.$store.getters.currSong.youtubeId;
  },
  methods: {
    togglePlay() {
      if (this.isPlaying) this.pauseVideo();
      else this.playVideo();
      this.isPlaying = !this.isPlaying;
    },
    playVideo() {
      this.player.playVideo();
    },
    pauseVideo() {
      console.log(this.player);
      this.player.pauseVideo();
    },
    async getVolume() {
      await this.player.setVolume(50);
    },
    startAt(ev) {
      this.player.loadVideoById(this.videoId, ev);
    },
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
  },
  watch: {},
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
