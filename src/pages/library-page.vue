<template>
  <section class="library-page">
    <h2 class="library-header">Library</h2>
    <div class="library-main">
      <div class="library-row1">
        <router-link class="router-link-liked-song" to="/liked-songs">
          <div class="liked-songs-container">
            <div class="track-tilte">
              <p v-for="song in songs" :key="song.id">
                {{ song.title }}
              </p>
            </div>
            <div class="tracks-info">
              <h2>Liked Songs</h2>
              <p>{{ songs.length }} liked songs</p>
            </div>
          </div>
        </router-link>

        <div class="recently-added">recently added</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'library-page',
  data() {
    return {
      songs: [
        {
          title: 'The Weekend - Save Your Tears',
        },
        {
          title: 'Eminem - Lose Yourself',
        },
        {
          title: 'Duft Punk - Lose Yourself To Dance',
        },
        {
          title: 'Red Hot Chili Peppers - Dark Necessities',
        },
      ],
    };
  },
  created() {},
  computed: {
    // songs() {
    //   return this.$store.getters.userLikedSongs;
    // },
  },
  components: {},
};
</script>
