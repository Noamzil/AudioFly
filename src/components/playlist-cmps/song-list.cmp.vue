<template>
  <ul class="playlist-content" v-if="songList">
    <draggable ghost-class="ghost" :v-model="songList" @end="onEnd">
      <li
        class="sortable"
        v-for="(song, index) in songList"
        :key="song.youtubeId"
      >
        <song-preview
          :song="song"
          :songNum="index + 1"
          @removeSong="removeSong"
          @toggleLikeSong="toggleLikeSong"
          @playSong="playSong"
        >
        </song-preview>
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
  props: ['songs'],
  data() {
    return {
      oldIndex: '',
      newIndex: '',
      songList: null,
    };
  },
  methods: {
    playSong(song) {
      this.$emit('playSong', song);
    },
    toggleLikeSong(song) {
      this.$emit('toggleLikeSong', song);
    },
    onEnd(ev) {
      this.oldIndex = ev.oldIndex;
      this.newIndex = ev.newIndex;

      if (this.oldIndex >= this.songList.length) {
        var k = this.newIndex - this.songList.length + 1;
        while (k--) {
          this.songList.push(undefined);
        }
      }
      this.songList.splice(
        this.newIndex,
        0,
        this.songList.splice(this.oldIndex, 1)[0]
      );
      this.$emit('update', this.songList);
    },
    removeSong(ev) {
      var idx = this.songList.findIndex((song) => {
        return song.youtubeId === ev.youtubeId;
      });
      this.songList.splice(idx, 1);
      this.$emit('update', this.songList);
    },
  },
  watch: {
    songs: {
      handler() {
        this.songList = JSON.parse(JSON.stringify(this.songs));
      },
      immediate: true,
      deep: true,
    },
  },
  components: {
    songPreview,
    draggable,
  },
};
</script>
