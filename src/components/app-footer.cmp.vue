<template>
  <section class="footer">
    <played-note-details />
    <song-progress @togglePlay="togglePlay" />
    <device-control />
    <!-- <song-player :isPlaying="isPlaying" /> -->
    <!-- <div id="player"></div> -->
    <youtube-player />
  </section>
</template>

<script>
import playedNoteDetails from './footer-cmps/played-note-details.cmp.vue';
import songProgress from './footer-cmps/song-progress.cmp.vue';
import deviceControl from './footer-cmps/device-control.cmp.vue';
import youtubePlayer from './footer-cmps/new-youtube.cmp.vue';
// import songPlayer from "./footer-cmps/play-song.cmp.vue";

export default {
  name: 'app-footer',
  data() {
    return {
      isPlaying: true,
      YTplayer: null,
    };
  },
  created() {
    this.openYtPlayer();
  },
  methods: {
    togglePlay() {
      if (this.isPlaying) this.pauseSong();
      else this.playSong();
      this.isPlaying = !this.isPlaying;
    },
    pauseSong() {
      player.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'pauseVideo' }),
        '*'
      );
    },
    playSong() {
      player.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'playVideo' }),
        '*'
      );
    },
    changeSong() {
      player.src = `https://www.youtube.com/embed/${this.currSongId}?playsinline=1&enablejsapi=1&origin=http%3A%2F%2Flocalhost%3A8080&widgetid=1`;
    },
    openYtPlayer() {
      var songId = this.currSongId;
      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      var player;
      if (player) console.log('im here');
      window.onYouTubePlayerAPIReady = function () {
        player = new YT.Player('player', {
          height: '0 ',
          width: '0',
          videoId: songId,
          playerVars: {
            playsinline: 1,
          },
          events: {
            onReady: onPlayerReady,
            // onStateChange: onPlayerStateChange,
          },
        });
      };
      function onPlayerReady(event) {
        event.target.playVideo();
      }
    },
  },
  computed: {
    currSongId() {
      return this.$store.getters.currSong.youtubeId;
    },
  },
  watch: {
    currSongId() {
      this.openYtPlayer();
      this.changeSong();
    },
  },
  components: {
    playedNoteDetails,
    songProgress,
    deviceControl,
    // songPlayer,
    youtubePlayer,
  },
};
</script>
