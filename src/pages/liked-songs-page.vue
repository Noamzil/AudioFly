<template>
  <section class="liked-song-page">
    <div class="flex liked-songs-description">
      <img
        src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
      />
      <div class="description-txt">
        <h2>PLAYLIST</h2>
        <h1>Liked Songs</h1>
        <div class="flex">
          <p>{{ getUser }}</p>
          <span>•</span>
          <p class="songs-length">list length</p>
        </div>
      </div>
    </div>
    <div class="playlist-page">
      <playlist-linear @playFirstSong="playFirstSong" @filter="setFilter">
      </playlist-linear>
      <!-- add events and emits  like the playlist page-->
    </div>
    <ul class="playlist-content">
      <li v-for="(song, index) in songs" :key="song.youtubeId">
        <song-preview
          :song="song"
          :songNum="index + 1"
          @toggleLikeSong="disLikeSong"
          @playSong="playSong"
        ></song-preview>
      </li>
    </ul>
  </section>
</template>

<script>
import songPreview from '../components/playlist-cmps/song-preview.cmp.vue';
import playlistLinear from '../components/playlist-cmps/playlist-linear.cmp.vue';
import { playlistService } from '../services/playlist.service.js';
export default {
  data() {
    return {
      songs: null,
    };
  },
  created() {
    this.songs = this.$store.getters.user.liked.song;
  },
  methods: {
    disLikeSong(song) {
      this.$store.dispatch({ type: 'removeLike', entity: song });
    },
    playSong(song) {
      console.log(song);
      this.$store.commit({ type: 'playSong', song });
    },
    playFirstSong() {
      var song = this.$store.getters.user.liked.song[0];
      this.$store.commit({ type: 'playSong', song });
    },
    setFilter(filterBy) {
      var songs = this.$store.getters.user.liked.song;
      var fileterdSongs = playlistService.filterPlaylist(songs, filterBy);
      this.songs = fileterdSongs;
    },
  },
  computed: {
    getUser() {
      return this.$store.getters.user.fullName;
    },
  },
  components: {
    songPreview,
    playlistLinear,
  },
};
</script>

<style></style>
