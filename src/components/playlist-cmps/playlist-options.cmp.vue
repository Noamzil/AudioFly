<template>
  <div class="playlist-linear-ops">
    <ul>
      <li @click="addToQueue">Add to queue</li>
      <li @click="editPlaylist">Edit Playlist</li>
      <li @click="removePlaylist">Remove Playlist</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "playlist-options",
  methods: {
    addToQueue() {
      console.log(`addToQueue playlist`);
      this.currPlayList.songs.forEach((song) => {
        var entity = song;
        this.$store.commit({ type: "addToQueue", entity });
      })
    },
    editPlaylist() {
      this.$emit('editPlaylist')
    },
    removePlaylist() {
      var playlistId = this.currPlayList._id.playlistId
      // console.log(this.currPlayList);
      this.$router.push('/')
      this.$store.dispatch({type:'removePlaylist', playlistId})
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
