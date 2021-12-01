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
      <p>{{ playlist.time }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'playlist-content',
  //   props: ['playlist'],
  data() {
    return {
      playlist: {
        _id: 'pl101',
        type: 'playlist',
        playlistImg: 'assets/img/playlist-imgs/Rock&Roll',
        createdBy: 'Orly Amdadi',
        createdAt: 150245112,
        likes: 50,
        tags: ['rock', 'pop'],
        name: 'My PlayList',
        discription: 'loem empsum',
        time: 12252545448,
        songs: [
          {
            _id: 's101',
            name: 'All of Me',
          },
          {
            _id: 's102',
            name: "There's No Way Out of Here",
          },
        ],
      },
    };
  },
};
</script>
