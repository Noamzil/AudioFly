<template>
  <section class="sidebarPlaylist">
    <h1 v-for="playlist in playlists" :key="playlist">{{ playlist }}</h1>
  </section>
</template>

<script>
export default {
  name: "sidebarPlaylist",
  data() {
    return {
      playlists: ["My Playlist #1", "My Playlist #2", "My Playlist #3", "My Playlist #4"],
    };
  },
};
</script>

<style>
</style>