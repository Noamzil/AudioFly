<template>
  <section v-if="relatedPlaylists" class="related-playlists-container">
    <h1>Related Playlists</h1>
    <div>
      <ul>
        <li
          v-for="playlist in relatedPlaylists"
          :key="playlist._id"
          class="playlist-container"
          @click="goToPlaylist(playlist)"
        >
          <img :src="playlist.playlistImg" class="related-playlists-img" />
          <div class="playlist-info">
            <h1 class="playlist-name">{{ playlist.name }}</h1>
            <p>{{ playlist.discription }}</p>
          </div>
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
  methods: {
    goToPlaylist(playlist) {
      this.$router.push("/playlist/" + playlist._id);
    },
  }
};
</script>
