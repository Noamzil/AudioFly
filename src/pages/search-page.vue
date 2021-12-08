<template>
  <section class="search-page">
    <serach-res @toggleLikeSong="toggleLikeSong" />
    <h1>Your top genres</h1>
    <div class="flex top-genres-container">
      <div
        v-for="genre in genres"
        :key="genre"
        class="top-genre"
        :class="genre"
        @click="toGenrePage(genre)"
      >
        <h3>{{ genre }}</h3>
        <img
          :src="require('../assets/img/genres-img/' + genre + '.jpg')"
          class="top-genre-img"
        />
      </div>
    </div>
    <h1 class="browse-txt">Browse all</h1>
    <div class="flex all-genres">
      <div
        v-for="genre in browseGenres"
        :key="genre"
        class="browse-genre-container"
        :class="genre"
        @click="toGenrePage(genre)"
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
        // "Made For You",
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
  methods: {
    async toggleLikeSong(song) {
      song.type = "song";
      song.addedAt = "2021-12-06T18:32:22.270Z";
      console.log(song);
      const userLiked = this.$store.getters.user.liked.song;
      const isLiked = userLiked.findIndex(
        (currSong) => currSong.youtubeId === song.youtubeId
      );
      console.log(isLiked);

      if (isLiked > -1) {
        await this.$store.dispatch({ type: "removeLike", entity: song });
      } else {
        await this.$store.dispatch({ type: "addLike", entity: song });
      }
    },
    toGenrePage(genre) {
      console.log(genre);
      this.$router.push('/genre/'+genre)
    },
  },
  components: {
    serachRes,
  },
};
</script>
