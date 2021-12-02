<template>
  <div class="playlist-content">
    <div
      class="song-container"
      v-for="(song, index) in playlist.songs"
      :key="song._id"
    >
      <p class="index">{{ index + 1 }}</p>
      <div class="song-details">
        <img
          class="song-img"
          :src="require('../../' + playlist.playlistImg + '.jpeg')"
        />
        <p>{{ song.name }}</p>
      </div>
      <a href="">Album name</a>
      <p>{{ playlist.createdAt }}</p>
      <p>{{ playlistTime }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "playlist-content",
  //   props: ['playlist'],
  data() {
    return {
      playlist: {
        _id: "pl101",
        type: "playlist",
        playlistImg: "assets/img/playlist-imgs/Rock&Roll",
        createdBy: "Orly Amdadi",
        createdAt: 150245112,
        likes: 50,
        tags: ["rock", "pop"],
        name: "My PlayList",
        discription: "loem empsum",
        time: 12252,
        songs: [
          {
            _id: "s101",
            name: "All of Me",
          },
          {
            _id: "s102",
            name: "There's No Way Out of Here",
          },
        ],
      },
    };
  },
  computed: {
    playlistTime() {
      var hours = Math.floor(this.playlist.time / 3600);
      var minutes = Math.floor((this.playlist.time - hours * 3600) / 60);
      var seconds = this.playlist.time - hours * 3600 - minutes * 60;
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return hours + ":" + minutes + ":" + seconds;
    },
  },
};
</script>
