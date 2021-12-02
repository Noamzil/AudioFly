<template>
  <div class="linear-container">
    <section>
      <div class="btns-container">
        <button class="play-btn">
          <svg role="img" viewBox="0 0 24 24" aria-hidden="true">
            <polygon
              points="21.57 12 5.98 3 5.98 21 21.57 12"
              fill="currentColor"
            ></polygon>
          </svg>
        </button>
        <svg class="heart" role="img">
          <path
            d="M27.319 5.927a7.445 7.445 0 00-10.02-.462s-.545.469-1.299.469c-.775 0-1.299-.469-1.299-.469a7.445 7.445 0 00-10.02 10.993l9.266 10.848a2.7 2.7 0 004.106 0l9.266-10.848a7.447 7.447 0 000-10.531z"
          ></path>
        </svg>
        <svg class="dots" role="img" viewBox="0 0 32 32">
          <path
            d="M5.998 13.999A2 2 0 105.999 18a2 2 0 00-.001-4zm10.001 0A2 2 0 1016 18a2 2 0 000-4zm10.001 0A2 2 0 1026.001 18 2 2 0 0026 14z"
          ></path>
        </svg>
      </div>
      <div class="content-header">
        <small class="hashtag">#</small>
        <small class="title">Title</small>
        <small class="album">Album</small>
        <small class="date">Date added</small>
        <svg role="img" viewBox="0 0 16 16" class="time">
          <path
            d="M7.999 3h-1v5h3V7h-2V3zM7.5 0a7.5 7.5 0 100 15 7.5 7.5 0 000-15zm0 14C3.916 14 1 11.084 1 7.5S3.916 1 7.5 1 14 3.916 14 7.5 11.084 14 7.5 14z"
          ></path>
          <path fill="none" d="M16 0v16H0V0z"></path>
        </svg>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'playlist-linear',
  //   props: ['playlist'],
  data() {
    return {
      playlist: {
        _id: 'pl101',
        type: 'playlist',
        playlistImg: 'img',
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
