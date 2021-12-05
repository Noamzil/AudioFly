<template>
  <section class="song-player">
    <!-- <iframe
      ref="video"
      width="330"
      height="300"
      allow="autoplay"
      :src="`https://www.youtube.com/embed/${songIdToPlay}?autoplay=1${mute}`"
    >
    </iframe> -->
    <button @click="toPlay">play</button>
    <button @click="toStop">pause</button>
    <div id="player"></div>
  </section>
</template>

<script>
export default {
  name: "song-player",
  props: ['isAtPlay'],
  data() {
    return {
      isPlay: this.isAtPlay,
      YTplayer: null,
    };
  },
  created() {
    this.openYtPlayer();
  },
  computed: {
    mute() {
      return this.$store.getters.isMute ? "&mute=1" : "&mute=0";
    },
    songIdToPlay() {
      return this.$store.getters.currSong.youtubeId;
    },
  },
  methods: {
    toStop() {
      player.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "pauseVideo" }),
        "*"
      );
    },
    toPlay() {
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
        console.log(player);
      };

      function onPlayerReady(event) {
        event.target.playVideo();
      }

      var done = false;
      function onPlayerStateChange(event) {
        // console.log(event);
        var state = player.getPlayerState();
        // console.log(state);
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
    },
  },
};
</script>
