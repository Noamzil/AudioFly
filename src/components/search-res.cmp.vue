<template>
  <section v-if="this.$store.getters.songsRes" class="songs-res-container">
    <!-- <h1>Top result</h1> -->
    <!-- <h1>Songs</h1> -->
    <div class="top-res">
      <img
        :src=topSong[0].img
      />
      <h1>{{topSong[0].title}}</h1>
      <!-- <a>btn</a> -->
    </div>
    <div class="songs-res">
      <div v-for="song in songsRes" :key="song.id" class="song-res">
        <img :src=song.img />
        <h3>{{song.title}}</h3>
        <small>heart</small>
        <small>time</small>
      </div>
    </div>

    <!-- <h1 v-if="songsRes">{{songsRes}}</h1> -->
  </section>
</template>

<script>
export default {
  name: "search-res",
  computed: {
    songsRes() {
      return this.$store.getters.songsRes;
    },
    topSong() {
        return this.$store.getters.songsRes.splice(0,1)
    }
  },
};
</script>

