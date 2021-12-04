<template>
  <article class="playlist-preview">
    <!-- :class="isHighlight" -->
    <div
      @mouseover="highlight = true"
      @mouseleave="highlight = false"
      @click="goToPlaylist"
      class="playlist-prev-container"
    >
      <img class="playlist-img" :src="playlist.playlistImg" />
      <h1 class="playlist-name">{{ playlist.name }}</h1>
      <div class="song-name-container">
        <span v-for="song in first2Songs" :key="song.youtubeId"
          >{{ song.title }}|</span
        >
      </div>
      <button
        class="play-top-playlist"
        :class="isHighlight"
        @click="playSong(topSong)"
      >
        <svg role="img" viewBox="0 0 24 24">
          <polygon
            points="21.57 12 5.98 3 5.98 21 21.57 12"
            fill="currentColor"
          ></polygon>
        </svg>
      </button>
    </div>
  </article>
</template>

<script>
export default {
  name: "playlistPreview",
  props: ["currPlaylist"],
  data() {
    return {
      playlist: null,
      highlight: false,
    };
  },
  created() {
    // console.log(this.currPlaylist);
    this.playlist = JSON.parse(JSON.stringify(this.currPlaylist));
  },
  methods: {
    goToPlaylist() {
      this.$router.push("/playlist/" + this.playlist._id);
    },
  },
  computed: {
    isHighlight() {
      return this.highlight ? "highlight" : "";
    },
    first2Songs() {
      return this.playlist.songs.slice(0, 2);
    },
  },
};
</script>