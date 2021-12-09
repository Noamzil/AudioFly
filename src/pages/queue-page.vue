<template>
  <section class="queue-page">
    <h1 class="queue">Queue</h1>
    <div class="queue-songs">
      <div class="now-plating-container">
        <h2 class="song-state">Now playing</h2>
        <songPreview
          @removeSong="removeSong"
          :song="currSong"
          :songNum="1"
          class="now-playing"
        />
      </div>
      <h2 class="song-state">Next up</h2>
      <ul class="queue-content" v-if="songQueue">
        <draggable ghost-class="ghost" :v-model="songQueue" @end="onEnd">
          <li v-for="(song, index) in songQueue" :key="index">
            <songPreview
              @removeSong="removeSong"
              v-if="index"
              :song="song"
              :songNum="index + 2"
            />
          </li>
        </draggable>
      </ul>
    </div>
  </section>
</template>

<script>
import songPreview from '../components/queue-cmps/song-queue-preview.cmp.vue';
import draggable from 'vuedraggable';
export default {
  name: 'queue-page',
  data() {
    return {
      oldIndex: '',
      newIndex: '',
      songQueue: this.$store.getters.queueSongs,
    };
  },
  methods: {
    onEnd(ev) {
      this.oldIndex = ev.oldIndex - 1;
      this.newIndex = ev.newIndex - 1;
      var newQueue = [...this.songQueue];
      var firstong = newQueue.splice[(0, 1)];
      if (this.oldIndex >= newQueue.length) {
        var k = this.newIndex - newQueue.length + 1;
        while (k--) {
          newQueue.push(undefined);
        }
      }
      newQueue.splice(this.newIndex, 0, newQueue.splice(this.oldIndex, 1)[0]);
      newQueue.unshift(firstong);

      this.$store.dispatch({
        type: 'updateQueue',
        Queue: this.songQueue,
      });
    },
    removeSong(ev) {
      var idx = this.songQueue.findIndex((song) => {
        return song.youtubeId === ev.youtubeId;
      });
      this.songQueue.splice(idx, 1);
      this.$store.dispatch({
        type: 'updateQueue',
        Queue: this.songQueue,
      });
    },
  },
  computed: {
    currSong() {
      return this.$store.getters.currSong;
    },
  },
  watch: {
    songs: {
      handler() {
        this.songQueue = [...this.songQueue];
      },
      immediate: true,
      deep: true,
    },
  },
  components: { songPreview, draggable },
};
</script>
