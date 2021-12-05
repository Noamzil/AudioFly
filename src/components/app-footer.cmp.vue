<template>
  <section class="footer">
    <played-note-details />
    <song-progress @togglePlay="togglePlay"/>
    <device-control />
    <!-- <song-player :isPlaying="isPlaying" /> -->
    <div id="player"></div>
  </section>
</template>

<script>
import playedNoteDetails from "./footer-cmps/played-note-details.cmp.vue";
import songProgress from "./footer-cmps/song-progress.cmp.vue";
import deviceControl from "./footer-cmps/device-control.cmp.vue";
// import songPlayer from "./footer-cmps/play-song.cmp.vue";

export default {
  name: "app-footer",
  data() {
    return {
      isPlaying: true,
    };
  },
  created() {
    this.openYtPlayer();
  },
  methods: {
    togglePlay() {
      console.log(this.isPlaying);
      if (this.isPlaying) this.pauseSong()
      else this.playSong() 
      this.isPlaying = !this.isPlaying
    },
    pauseSong() {
      console.log(player);
      player.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "pauseVideo" }),
        "*"
      );
    },
    playSong() {
      player.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "playVideo" }),
        "*"
      );
    },
    openYtPlayer() {
      var songId = this.$store.getters.currSong.youtubeId;
      var tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      var player;
      window.onYouTubePlayerAPIReady = function () {
        player = new YT.Player("player", {
          height: "390",
          width: "640",
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
  components: {
    playedNoteDetails,
    songProgress,
    deviceControl,
    // songPlayer,
  },
};
</script>
