<template>
  <section class="playlist-page">
    <div class="playlist-description">
      <img :src="require('../' + playlist.playlistImg + '.jpeg')" />
      <h1>Your playlist</h1>
    </div>
  </section>
</template>

<script>
export default {
  name: 'playlist-page',
  //   props: ['playlist'],
  data() {
    return {
      playlist: {
        _id: 'pl101',
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
