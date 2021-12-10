<template>
  <section v-if="relatedPlaylists" class="related-playlists-container">
    <h1>Related Playlists</h1>
    <!-- <pre>{{relatedPlaylists}}</pre> -->
    <div>
      <ul>
        <li
          v-for="playlist in relatedPlaylists"
          :key="playlist._id"
          class="playlist-container"
        >
          <h1>{{ playlist.name }}</h1>
          <img :src="playlist.playlistImg" class="related-playlists-img" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "relatedPlaylistsSearch",
  data() {
    return {};
  },
  computed: {
    relatedPlaylists() {
      return this.$store.getters.relatedPlaylists;
    },
  },
};
</script>

<style>
.related-playlists-container {
  /* background-color: aqua; */
  padding: 20px 0;
}
.related-playlists-container ul {
  display: flex;
  width: 100%;
  gap: 30px;
  padding: 20px 0;
}
.related-playlists-container li {
  border-radius: 4px;
  background-color: #181818;
  width: 270px;
  height: 380px;
  padding: 15px;
}
.related-playlists-img {
  height: 200px;
  width: 200px;
  margin-bottom: 10px;
  box-shadow: 1px 1px 8px 3px black;
  object-fit: cover;
}
.playlist-container {
  padding: 10px;
  height: 300px;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.3s;
}
</style>