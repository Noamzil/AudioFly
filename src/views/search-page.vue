<template>
  <section class="search-page">
    <h1>Your top genres</h1>
    <div class="top-genres-container">
      <div v-for="genre in genres" :key="genre" class="genre-container" :class="genre">
        <h3>{{ genre }}</h3>
        <img
          src="https://t.scdn.co/images/0a74d96e091a495bb09c0d83210910c3"
          class="top-genre-img"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "search-page",
  data() {
    return {
      genres: ["Pop", "Rock", "Indie", "Hip-Hop"],
    };
  },
};
</script>
