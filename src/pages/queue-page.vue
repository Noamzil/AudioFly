<template>
  <section class="queue-page">
    <h1 class="queue">Queue</h1>
    <div class="queue-songs">
      <div class="now-plating-container">
        <h2 class="song-state">Now playing</h2>
        <songPreview :song="currSong" :songNum="1" class="now-playing" />
      </div>
      <h2 class="song-state">Next up</h2>
      <ul class="queue-content" v-if="songQueue">
        <li v-for="(song, index) in songQueue" :key="index">
          <songPreview :song="song" :songNum="index + 2" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import songPreview from "../components/queue-cmps/song-queue-preview.cmp.vue";
export default {
  name: "queue-page",
  data() {
    return {
      songQueue: this.$store.getters.queueSongs
    };
  },
  computed: {
    currSong() {
      return this.$store.getters.currSong;
    },
  },
  components: { songPreview },
};
</script>
