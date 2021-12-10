<template>
  <section v-if="relatedPlaylists">
      <!-- <pre>{{relatedPlaylists}}</pre> -->
      <div>
          <ul>
              <li v-for="playlist in relatedPlaylists" :key="playlist._id">
                  <h1>{{playlist.name}}</h1>
                  <img :src="playlist.playlistImg">
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
        return this.$store.getters.relatedPlaylists
    },
  },
};
</script>
