<template>
  <ul class="playlist-content" v-if="playlist">
    <draggable ghost-class="ghost" :v-model="playlist.songs" @end="onEnd">
      <li
        class="sortable"
        v-for="(song, index) in playlist.songs"
        :key="song.youtubeId"
      >
        <song-preview
          :song="song"
          :songNum="index + 1"
          @removeSong="removeSong"
          @toggleLikeSong="toggleLikeSong"
          @playSong="playSong"
        ></song-preview>
      </li>
    </draggable>
  </ul>
</template>

<script>
import draggable from 'vuedraggable';
import { utilService } from '../../services/util.service.js';
import songPreview from './song-preview.cmp.vue';

export default {
  name: 'playlist-content',
  props: ['currPlaylist'],
  data() {
    return {
      playlist: null,
      oldIndex: '',
      newIndex: '',
    };
  },
  methods: {
    playSong(song) {
      this.$store.commit({ type: 'playSong', song });
    },
    toggleLikeSong(song) {
      this.$emit('toggleLikeSong', song);
    },
    onEnd(ev) {
      var playlist = this.playlist;
      this.oldIndex = ev.oldIndex;
      this.newIndex = ev.newIndex;

      if (this.oldIndex >= playlist.songs.length) {
        var k = this.newIndex - playlist.songs.length + 1;
        while (k--) {
          playlist.songs.push(undefined);
        }
      }
      playlist.songs.splice(
        this.newIndex,
        0,
        playlist.songs.splice(this.oldIndex, 1)[0]
      );
      this.$store.dispatch({ type: 'updatePlaylist', playlist });
    },
    removeSong(ev) {
      var playlist = this.playlist;
      var idx = playlist.songs.findIndex((song) => {
        return song.youtubeId === ev.youtubeId;
      });
      playlist.songs.splice(idx, 1);
      this.$store.dispatch({ type: 'updatePlaylist', playlist });
    },
  },
  watch: {
    currPlaylist: {
      handler() {
        this.playlist = JSON.parse(JSON.stringify(this.currPlaylist));
      },
      immediate: true,
    },
  },
  components: {
    songPreview,
    draggable,
  },
};
</script>
