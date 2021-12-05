<template>
  <section v-if="currPlaylist" class="playlist-page">
    <playlist-description @imgUpload="imgUpload"  :currPlaylist="currPlaylist" />
    <playlist-linear
      @disLikePlaylist="disLikePlaylist"
      @likePlaylist="likePlaylist"
      @playFirstSong="playFirstSong"
      :isLiked="isPlaylistLiked"
    />
    <playlist-content
      @likeSong="likeSong"
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
    console.log(this.$router);
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
    disLikePlaylist() {
      var playlist = this.currPlaylist;
      this.$store.dispatch({ type: 'removeLike', entity: playlist });
    },
    likePlaylist() {
      var {_id, type, } = this.currPlaylist;
      const miniPlaylist = {_id, type}
      this.$store.dispatch({ type: 'addLike', entity: miniPlaylist });
    },
    likeSong(song) {
      this.$store.dispatch({type: 'addLike', entity: song})
    },
    disLikeSong(song) {
      this.$store.dispatch({type: 'removeLike', entity: song})
    },
    playFirstSong() {
      var song = this.currPlaylist.songs[0];
      this.$store.commit({ type: 'playSong', song });
    },
    imgUpload(fileUploadEv) {
      const img = fileUploadEv.target.files[0];
      const reader = new FileReader()
      reader.readAsDataURL(img);
      reader.onload = ev => {
        this.currPlaylist.playlistImg = ev.target.result;
        const playlist = this.currPlaylist
        this.$store.dispatch({type: 'updatePlaylist', playlist})
      }
  },
  },
  computed: {
    isPlaylistLiked() {
      const userLiked = this.$store.getters.user.liked.playlist
      const isLiked = userLiked.find(playlist => playlist._id === this.$route.params.playlistId)
      return isLiked ? true : false;
    }
  },
  components: {
    playlistDescription,
    playlistLinear,
    playlistContent,
  },
};
</script>
