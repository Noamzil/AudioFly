<template>
  <ul class="playlist-content" v-if="playlist">
    <li v-for="(song, index) in playlist.songs" :key="song.youtubeId">
      <song-preview :song="song" :songNum="index+1" @toggleLikeSong="toggleLikeSong" @playSong="playSong"></song-preview>
    </li>
  </ul>
</template>

<script>
import { utilService } from '../../services/util.service.js';
import songPreview from './song-preview.cmp.vue'
export default {
  name: 'playlist-content',
  props: ['currPlaylist'],
  data() {
    return {
      playlist: null,
    };
  },
  created() {
    this.playlist = JSON.parse(JSON.stringify(this.currPlaylist));
  },
  methods: {
    playSong(song) {
      console.log('hii');
      this.$store.commit({ type: 'playSong', song });
    },
    toggleLikeSong(song) {
      this.$emit('toggleLikeSong', song)
    } 
  },
  components: {
    songPreview,
  },
};
</script>
