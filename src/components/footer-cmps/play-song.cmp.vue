<template>
  <section class="song-player">
    <div id="player"></div>
  </section>
</template>

<script>
export default {
  name: 'song-player',
  props: ['isPlaying'],
  data() {
    return {
      isPlay: this.isAtPlay,
      YTplayer: null,
    };
  },
  created() {
    this.openYtPlayer();
    // console.log(`1`);
    var video = document.getElementById('player');
    // console.log(video);
  },
  computed: {},
  methods: {
    pasueSong() {
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
    openYtPlayer() {
      // console.log(`in`);
      var songId = this.$store.getters.currSong.youtubeId;
      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var player;
      window.onYouTubePlayerAPIReady = function () {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: songId,
          playerVars: {
            playsinline: 1,
          },
          events: {
            onReady: onPlayerReady,
            // onStateChange: onPlayerStateChange,
          },
        });
        // console.log(player);
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
