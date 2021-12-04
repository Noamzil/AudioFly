<template>
  <section class="sidebarPlaylist">
    <div class="playlist" v-for="playlist in playlists" :key="playlist._id">
      <router-link :to="'/playlist/' + playlist._id"> 
        <h1>{{ playlist.name }}</h1>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'sidebarPlaylist',
  computed: {
    playlists() {
      return this.$store.getters.playlists
    }
  }
};
</script>
