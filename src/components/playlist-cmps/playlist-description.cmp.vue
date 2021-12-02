<template>
  <div class="playlist-description">
    <img :src="require('../../' + playlist.playlistImg + '.jpeg')" />
    <div class="description-txt">
      <h2>Playlist</h2>
      <h1>{{ playlist.name }}</h1>
      <p>{{ playlist.discription }}</p>
      <p>Artists names in the album...</p>
      <div class="playlist-songs-details">
        <a>{{ playlist.createdBy }}</a>
        <span class="dot"> • </span>
        <span
          >{{ playlist.songs.length }} songs <span class="dot"> • </span> 00:00
          (cpmputed album time)</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'playlist-description',
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


