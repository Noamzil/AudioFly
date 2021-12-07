<template>
  <section class="gerne-page">
    <h1 class="genre-name">{{genre}}</h1>
    <div class="popular-playlists">
      <div>
        <h2>Popular playlists</h2>
        <h3>SEE ALL</h3>
        <!-- <genre-songs-list /> -->
      </div>
    </div>
    <div class="new-releases">
      <div>
        <h2>New releases</h2>
        <h3>SEE ALL</h3>
      </div>
    </div>
  </section>
</template>

<script>
export default {
    name:'genre-page',
    data() {
        return {

        }
    },
    computed: {
        genre() {
            return this.$route.params.genreType
        }
    }
};
</script>
