<template>
  <section class="search-page">
    <serach-res />
    <h1>Your top genres</h1>
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
  </section>
</template>

<script>
import serachRes from "../components/search-res.cmp.vue";
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
    };
  },
  computed: {
    topGenres() {
      return this.genres.splice(0, 2);
    },
    browseGenres() {
      return this.genres.splice(3);
    },
  },
  components: {
    serachRes,
  },
};
</script>
