<template>

</template>

<script>
export default {
  name: `youtube-player`,
  data() {
    return {
      videoId: 'lG0Ys-2d4MA',
    };
  },
  methods: {
    playVideo() {
      this.player.playVideo();
    },
    playing() {
      console.log('\o/ we are watching!!!');
    },
    pauseVideo() {
      this.player.pauseVideo();
    },
    async getVolume() {
      var player = await this.player.setVolume(50);
    },

  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
  },
};
</script>

<style>
.youtube-player {
  margin-bottom: 200px;
  margin-right: 100px;
}
</style>
