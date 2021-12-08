<template>
  <section>
    <section class="flex footer">
      <played-note-details />
      <song-progress
        :currSong="currSong"
        @togglePlay="togglePlay"
        @startAt="startAt"
        @playNextSong="playNextSong"
        @shufflePlaylist="shufflePlaylist"
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
    async changeVolume(ev) {
      await this.player.setVolume(ev);
    },
    startAt(ev) {
      this.player.loadVideoById(this.$store.getters.currSong.youtubeId, ev);
    },
    shufflePlaylist() {
      this.$store.commit('shufflePlaylist');
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
