<template>
  <section class="search-page">
    <h1>Your top genres</h1>
    <div class="top-genres-container">
      <div
        v-for="genre in genres"
        :key="genre"
        class="genre-container"
        :class="genre"
      >
        <h3>{{ genre }}</h3>
        <!-- <img :src="imgUrl" class="top-genre-img"/> -->
        <img src="../assets/img/genres-img/Pop.jpeg" class="top-genre-img"/>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "search-page",
  data() {
    return {
      imgUrl : '../assets/img/genres-img/Rock.jpeg',
      genres: ["Pop", "Rock", "Indie", "Hip-Hop"],
    };
  },
};
</script>
