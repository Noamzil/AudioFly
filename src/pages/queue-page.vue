<template>
  <section class="queue-page">
    <h1 class="queue">Queue</h1>
    <div class="queue-songs">
      <div class="now-plating-container">
        <h2 class="song-state">Now playing</h2>
        <songPreview :song="currSong" :songNum="1" class="now-playing" />
      </div>
      <h2 class="song-state">Next up</h2>
      <ul class="queue-content">
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
      songQueue: [
        {
          addedAt: "2021-12-06T18:32:22.270Z",
          img: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
          time: 180050,
          title: "The Weekend - Save Your Tears",
          type: "song",
          youtubeId: "XXYlFuWEuKI",
        },
        {
          addedAt: "2021-12-06T18:32:22.270Z",
          img: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
          time: 180050,
          title: "The Weekend - Save Your Tears",
          type: "song",
          youtubeId: "XXYlFuWEuKI",
        },
      ],
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
