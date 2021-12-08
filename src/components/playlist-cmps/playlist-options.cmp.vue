<template>
  <div class="playlist-linear-ops">
    <ul>
      <li @click="share">Share</li>
      <li @click="addToQueue">Add to queue</li>
      <li @click="editPlaylist">Edit Playlist</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "playlist-options",
  //   props: ['song'],
  methods: {
    // removeSong() {
    //   this.$emit('removeSong', this.song);
    // },
    addToQueue() {
      console.log(`addToQueue playlist`);
      this.currPlayList.songs.forEach((song) => {
        var entity = song;
        this.$store.commit({ type: "addToQueue", entity });
      })
    },
    share() {
      console.log(`share`);
    },
    editPlaylist() {
      this.$emit('editPlaylist')
    }
  },
  computed: {
    currPlayList() {
      const playlistId = this.$route.params;
      const playlists = this.$store.getters.playlists;
      var currPlayList = playlists.find(
        (playlist) => (playlist._id = playlistId)
      );
      return currPlayList;
    },
  },
};
</script>
