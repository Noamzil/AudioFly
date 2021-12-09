<template>
  <section>
    <article>
      <h1>{{currPlaylist.title}}</h1>
    </article>
  </section>
</template>

<script>
export default {
  name: "genre-playlist-preview",
  props: ["playlist"],
  data() {
    return {
      playlist: null,
      highlight: false,
    };
  },
  created() {
  },
  methods: {
    goToPlaylist() {
      this.$router.push("/playlist/" + this.playlist._id);
    },
  },
  computed: {
    isHighlight() {
      return this.highlight ? "highlight" : "";
    },
    // first2Songs() {
    //   return this.playlist.songs.slice(0, 2);
    // },
  },
};
</script>

<style>
</style>