<template>
  <article class="playlist-preview">
    <div
      @mouseover="highlight = true"
      @mouseleave="highlight = false"
      @click="goToPlaylist"
      class="playlist-prev-container"
    >
      <div class="img-div">
        <img class="playlist-img" :src="playlist.playlistImg" />
      </div>
      <div class="playlist-info">
        <h1 class="playlist-name">{{ playlist.name }}</h1>
        <p>{{ discriptionUnder100 }}</p>
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
      <div class="likes">
        <h3>{{ playlistLikes }}</h3>
        <h3 @click.stop="likePlaylist">
          <i :class="{ green: isLikedByUser }" class="far fa-thumbs-up"></i>
        </h3>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'playlistPreview',
  props: ['currPlaylist'],
  data() {
    return {
      playlist: null,
      highlight: false,
    };
  },
  created() {
    this.playlist = JSON.parse(JSON.stringify(this.currPlaylist));
  },
  methods: {
    goToPlaylist() {
      this.$router.push('/playlist/' + this.playlist._id);
    },
    likePlaylist() {
      const playlistId = this.playlist._id;
      const { user } = this.$store.getters;

      var idx = user.liked[this.playlist.type].findIndex((currPlaylist) => {
        return currPlaylist._id === playlistId;
      });

      // const playlistId = this.playlist._id;

      //     var idx = user.liked.playlist.findIndex((currPlaylist) => {
      //   return currPlaylist._id === playlistId;
      // });

      const { _id, type } = this.currPlaylist;

      if (idx === -1) {
        this.$store.dispatch({ type: 'addLike', entity: { _id, type } });
        const playlist = this.playlist;
        playlist.likes += 1;
        this.$store.dispatch({ type: 'updatePlaylist', playlist });
      } else {
        this.$store.dispatch({ type: 'removeLike', entity: { _id, type } });
        const playlist = this.playlist;
        playlist.likes -= 1;
        this.$store.dispatch({ type: 'updatePlaylist', playlist });
      }
    },
  },
  // this.$store.dispatch({ type: 'removeLike', currPlaylist });
  computed: {
    isHighlight() {
      return this.highlight ? 'highlight' : '';
    },
    first2Songs() {
      return this.playlist.songs.slice(0, 2);
    },
    playlistLikes() {
      const playlistLikes = this.playlist.likes;
      if (playlistLikes > 10000) return parseInt(playlistLikes / 1000) + 'K';
      if (playlistLikes > 1000)
        return parseFloat(playlistLikes / 1000).toFixed(1) + 'K';
      return this.playlist.likes;
    },
    discriptionUnder100() {
      return this.playlist.discription.length > 40
        ? this.playlist.discription.slice(0, 40) + '...'
        : this.playlist.discription;
    },
    isLikedByUser() {
      const playlistId = this.playlist._id;
      const { user } = this.$store.getters;
      var idx = user.liked.playlist.findIndex((currPlaylist) => {
        return currPlaylist._id === playlistId;
      });
      if (idx > -1) {
        return true;
      } else {
        idx = user.liked.station.findIndex((currStation) => {
          return currStation._id === playlistId;
        });
        if (idx > -1) {
          return true;
        }
      }
      return false;
    },
  },
};
</script>
