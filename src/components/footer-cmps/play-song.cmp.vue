<template>
  <section class="song-player">
    <h1>HI!</h1>
    <p>{{ songIdToPlay }}</p>
    <p>{{ autoPlay }}</p>
    <p>{{ mute }}</p>
    <p> is mute{{this.$store.getters.isPlaying}}</p>
    <iframe
      width="420"
      height="315"
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
    autoPlay() {
      console.log(this.$store.getters.isPlaying);
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
