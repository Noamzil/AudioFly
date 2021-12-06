<template>
  <section>
    <section class="footer">
      <played-note-details />
      <song-progress
        :currSong="currSong"
        @togglePlay="togglePlay"
        @startAt="startAt"
        @playNextSong="playNextSong"
      />
      <device-control />
    </section>
    <div class="youtube-player">
      <button @click="getVolume">volume</button>
      <youtube :video-id="videoId" @playing="playing" ref="youtube"></youtube>
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
      songLength: 300,
    };
  },
  created() {
    this.videoId = this.$store.getters.currSong.youtubeId;
  },
  methods: {
    playing() {
      console.log(`in`);
      this.playVideo();
    },
    togglePlay() {
      console.log(this.isPlaying);
      if (this.isPlaying) this.pauseVideo();
      else this.playVideo();
    },
    playVideo() {
      console.log(`in play`);
      this.$store.commit('continueSong');
      this.player.playVideo();
    },
    pauseVideo() {
      console.log(this.player);
      this.$store.commit('stopSong');
      this.player.pauseVideo();
    },
    playNextSong() {
      this.player.loadVideoById(this.$store.getters.currSong.youtubeId, 0);
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
    currSong() {
      return this.$store.getters.currSong;
    },
    isPlaying() {
      return this.$store.getters.isSongOn;
    },
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
