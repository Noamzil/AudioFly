<template>
  <section v-if="this.$store.getters.songsRes" class="songs-res-container">
    <!-- <h1>Top result</h1> -->
    <!-- <h1>Songs</h1> -->
    <div class="top-res"  v-if="topSong">
      <img :src="topSong.img" />
      <h1>{{ topSong.title }}</h1>
      <button class="play-top-song-btn" @click="playSong(topSong)">
        <svg role="img" viewBox="0 0 24 24">
          <polygon
            points="21.57 12 5.98 3 5.98 21 21.57 12" fill="currentColor"></polygon>
        </svg>
      </button>
    </div>
    <div class="songs-res">
      <div v-for="song in songsRes" :key="song.id" class="song-res">
        <img :src="song.img" @click="playSong(song)"/>
        <h3>{{ song.title }}</h3>
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
      return this.$store.getters.songsRes.splice(0, 1)[0]
    },
  },
  methods: {
    playSong(song) {
      console.log(song)
      this.$store.commit({type: 'playSong', song})
      this.$store.commit({type:'toggleMute'})
    }
  }
};
</script>

