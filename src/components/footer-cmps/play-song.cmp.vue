<template>
  <section class="song-player">
    <iframe 
      width="330"
      height="300"
      allow="autoplay"
      :src="`https://www.youtube.com/embed/${songIdToPlay}?autoplay=1${mute}`"
    >
    </iframe>
  </section>
</template>

<script>
export default {
  name: "song-player",
  data() {
    return {
      isPlay: false,
    };
  },
  computed: {
    mute() {
      return this.$store.getters.isMute ? "&mute=1" : "&mute=0";
    },
    songIdToPlay() {
      return this.$store.getters.currSong.youtubeId;
    },
  },
};
</script>
