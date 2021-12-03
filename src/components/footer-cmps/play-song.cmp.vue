<template>
  <section class="song-player">
    <iframe 
      width="0"
      height="0"
      allow="autoplay"
      :src="`https://www.youtube.com/embed/${songIdToPlay}${autoPlay}${mute}`"
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
    autoPlay() {
      var autoPlay = this.$store.getters.isPlaying
        ? "?autoplay=1"
        : "?autoplay=0";
      return autoPlay;
    },
    mute() {
      return this.$store.getters.isMute ? "&mute=1" : "&mute=0";
    },
    songIdToPlay() {
      return this.$store.getters.currSong.id;
    },
  },
};
</script>
