<template>
  <section class="liked-song-page">
    <div class="liked-songs-description">
      <img
        src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
      />
      <div class="description-txt">
        <h2>PLAYLIST</h2>
        <h1>Liked Songs</h1>
        <div class="flex">
          <p>user info</p>
          <span>•</span>
          <p class="songs-length">list length</p>
        </div>
      </div>
    </div>
    <div class="liked-songs-linear">
      <button class="play-btn">
        <svg role="img" viewBox="0 0 24 24" aria-hidden="true">
          <polygon
            points="21.57 12 5.98 3 5.98 21 21.57 12"
            fill="currentColor"
          ></polygon>
        </svg>
      </button>
    </div>
    <ul class="playlist-content">
      <li v-for="(song, index) in likedSongs" :key="song.youtubeId">
        <song-preview :song="song" :songNum="index+1" @toggleLikeSong="disLikeSong" @playSong="playSong"></song-preview>
      </li>
    </ul>
  </section>
</template>

<script>
import songPreview from '../components/playlist-cmps/song-preview.cmp.vue'
export default {
  methods:{
    disLikeSong(song) {
      this.$store.dispatch({type: 'removeLike', entity: song})
    },
    playSong(song) {
      this.$store.commit({type: 'playSong', song})
    }
  },
  computed: {
    likedSongs() {
      return this.$store.getters.user.liked.song
    }
  },
  components: {
    songPreview
  }
};
</script>

<style>
</style>