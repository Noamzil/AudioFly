<template>
  <section v-if="currPlaylist" class="playlist-page">
    <playlist-description @imgUpload="imgUpload"  :currPlaylist="currPlaylist" />
    <playlist-linear
      @removePlaylist="removePlaylist"
      @addPlaylist="addPlaylist"
      @playFirstSong="playFirstSong"
    />
    <playlist-content
      @toogleSongIsLike="toogleSongIsLike"
      :currPlaylist="currPlaylist"
    />
  </section>
</template>

<script>
import playlistDescription from '../components/playlist-cmps/playlist-description.cmp.vue';
import playlistLinear from '../components/playlist-cmps/playlist-linear.cmp.vue';
import playlistContent from '../components/playlist-cmps/playlist-content.cmp.vue';
import { playlistService } from '../services/playlist.service.js';

export default {
  name: 'playlist-page',
  data() {
    return {
      currPlaylist: null,
    };
  },
  async created() {
    const { playlistId } = this.$route.params;
    const playlist = await playlistService.getPlaylistById(playlistId);
    this.currPlaylist = playlist;
  },
  watch: {
    '$route.params.playlistId': {
      async handler() {
        const playlistId = this.$route.params.playlistId;
        var playlist = await playlistService.getPlaylistById(playlistId);
        this.currPlaylist = JSON.parse(JSON.stringify(playlist));
      },
      immediate: true,
    },
  },
  methods: {
    removePlaylist() {
      var playlistId = this.currPlaylist._id;
      this.$store.dispatch({ type: 'removePlaylist', playlistId });
    },
    addPlaylist() {
      var playlist = this.currPlaylist;
      this.$store.dispatch({ type: 'addPlaylist', playlist });
    },
    playFirstSong() {
      var song = this.currPlaylist.songs[0];
      this.$store.commit({ type: 'playSong', song });
    },
    toogleSongIsLike(idx) {
      var playlist = this.currPlaylist;
      playlist.songs[idx].isLike = !playlist.songs[idx].isLike;
      this.$store.dispatch({ type: 'updatePlaylist', playlist });

      // var song = playlist.songs[idx];
      // if (playlist.songs[idx].isLike) {
      //   this.addSongTofavorites(song);
      // } else this.removeSongFromfavorites(song);
    },
    addSongTofavorites(song) {
      console.log('add to favorites ', song);
    },
    removeSongFromfavorites(song) {
      console.log('remove from favorites ', song);
    },
    imgUpload(fileUploadEv) {
      const img = fileUploadEv.target.files[0];
      const reader = new FileReader()
      reader.readAsDataURL(img);
      reader.onload = ev => {
        this.currPlaylist.playlistImg = ev.target.result;
      }
      const playlist = this.currPlaylist
      this.$store.dispatch({type: 'updatePlaylist', playlist})
  },
  },
  components: {
    playlistDescription,
    playlistLinear,
    playlistContent,
  },
};
</script>
