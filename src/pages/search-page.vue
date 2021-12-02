<template>
  <section class="search-page">
    <h1>Your top genres</h1>
    <h1 v-if="songIdToPlay">{{songIdToPlay}}</h1>
    <div class="top-genres-container">
      <div
        v-for="genre in genres"
        :key="genre"
        class="top-genre"
        :class="genre"
      >
        <h3>{{ genre }}</h3>
        <img
          :src="require('../assets/img/genres-img/' + genre + '.jpg')"
          class="top-genre-img"
        />
      </div>
    </div>
    <h1 class="browse-txt">Browse all</h1>
    <div class="all-genres">
      <div
        v-for="genre in browseGenres"
        :key="genre"
        class="browse-genre-container"
        :class="genre"
      >
        <h3>{{ genre }}</h3>
        <img
          :src="require('../assets/img/genres-img/' + genre + '.jpg')"
          class="browse-genre-img"
        />
      </div>
    </div>
    <div class="youtube-video">
      <iframe width="420" height="315" allow="autoplay" v-if="songIdToPlay"
        :src="`https://www.youtube.com/embed/${songIdToPlay}?autoplay=1&mute=1`">
      </iframe> 
    </div>
  </section>
</template>

<script>
export default {
  name: "search-page",
  data() {
    return {
      imgUrl: "../assets/img/genres-img/Rock.jpeg",
      genres: [
        "Pop",
        "Rock",
        "Indie",
        "Hip-Hop",
        "Podcasts",
        "Charts",
        "Made For You",
        // "New Releases",
        "Discover",
        "Concerts",
        "Mood",
        "Chill",
        "Party",
        "Focus",
        "Alternative",
        "EQUAL",
        "DanceElectronic",
        "Wellness",
        "Sleep",
        "Tastemakers",
        "Decades",
      ],
      serachFor: `the weekend`,
      ResultNum: 1,
      YOUTUBEAPIKEY: "AIzaSyCAwn2YlmL22UvEHK4xAiPBwgb5OSU1Teg",
      getVideo: `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${this.YOUTUBEAPIKEY}&q=${this.serachFor}`,
    };
  },
  computed: {
    topGenres() {
      return this.genres.splice(0, 2);
    },
    browseGenres() {
      return this.genres.splice(3);
    },
    songIdToPlay() {
      return this.$store.getters.songIdToPlay
    }
  },
};
</script>
