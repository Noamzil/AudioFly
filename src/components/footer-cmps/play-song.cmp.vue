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
    <button @click="toStop">stop</button>
    <div id="player"></div>
  </section>
</template>

<script>
export default {
  name: 'song-player',
  data() {
    return {
      isPlay: false,
      YTplayer: null,
    };
  },
  created() {
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
        videoId: songId ,
        playerVars: {
          playsinline: 1,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });

    };

    function onPlayerReady(event) {
      event.target.playVideo();
    }

    var done = false;
    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
      }
    }
    function stopVideo() {
      console.log(player);
      player.stopVideo();
    }
  },
  computed: {
    mute() {
      return this.$store.getters.isMute ? '&mute=1' : '&mute=0';
    },
    songIdToPlay() {
      return this.$store.getters.currSong.youtubeId;
    },
  },
  methods: {
    toStop() {
      console.log(YTplayer);
      player.stopVideo();
    },
  },
};
</script>
