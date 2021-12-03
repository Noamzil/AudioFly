<template>
  <section class="playlist-page">
    <!--  SENT TO EVERY CMPS HERE -->
    <playlist-description :playlist="currPlaylist"/>
    <playlist-linear :playlist="currPlaylist" />
    <playlist-content :playlist="currPlaylist" />
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
  watch: {
    '$route.params.playlistId': {
      async handler() {
        const playlistId = this.$route.params.playlistId;
        var playlist = await playlistService.getPlaylistById(playlistId);
        this.currPlaylist = JSON.parse(JSON.stringify(playlist));
        console.log(this.currPlaylist);
      },
      immediate: true,
    },
  },
  components: {
    playlistDescription,
    playlistLinear,
    playlistContent,
  },
};
</script>
