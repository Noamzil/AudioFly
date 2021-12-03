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
  data() {
    return {
      playlists: [
        { name: 'My Playlist #1', _id: 'PTr1X' },
        { name: 'My Playlist #2', _id: 'WvQks' },
        { name: 'My Playlist #3', _id: 'NVljz' },
        { name: 'My Playlist #4', _id: 'IRMIt' },
      ],
    };
  },
};
</script>
