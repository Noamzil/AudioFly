<template>
  <div class="linear-container">
    <section>
      <div class="playlist-linear">
        <div class="btns-container">
          <button @click="playFirstSong" class="play-btn">
            <svg role="img" viewBox="0 0 24 24" aria-hidden="true">
              <polygon
                points="21.57 12 5.98 3 5.98 21 21.57 12"
                fill="currentColor"
              ></polygon>
            </svg>
          </button>
          <button v-if="isLike" @click="disLikePlaylist" class="heart-btn">
            <svg class="heart" role="img">
              <path
                d="M27.319 5.927a7.445 7.445 0 00-10.02-.462s-.545.469-1.299.469c-.775 0-1.299-.469-1.299-.469a7.445 7.445 0 00-10.02 10.993l9.266 10.848a2.7 2.7 0 004.106 0l9.266-10.848a7.447 7.447 0 000-10.531z"
              ></path>
            </svg>
          </button>
          <button v-else @click="likePlaylist" class="heart-btn">
            <svg role="img" class="heart empty">
              <path
                d="M27.672 5.573a7.904 7.904 0 00-10.697-.489c-.004.003-.425.35-.975.35-.564 0-.965-.341-.979-.354a7.904 7.904 0 00-10.693.493A7.896 7.896 0 002 11.192c0 2.123.827 4.118 2.301 5.59l9.266 10.848a3.196 3.196 0 004.866 0l9.239-10.819A7.892 7.892 0 0030 11.192a7.896 7.896 0 00-2.328-5.619zm-.734 10.56l-9.266 10.848c-.837.979-2.508.979-3.346 0L5.035 16.104A6.9 6.9 0 013 11.192 6.9 6.9 0 015.035 6.28a6.935 6.935 0 014.913-2.048 6.89 6.89 0 014.419 1.605A2.58 2.58 0 0016 6.434c.914 0 1.555-.53 1.619-.585a6.908 6.908 0 019.346.431C28.277 7.593 29 9.337 29 11.192s-.723 3.6-2.062 4.941z"
              ></path>
            </svg>
          </button>
          <svg class="dots" role="img" viewBox="0 0 32 32">
            <path
              d="M5.998 13.999A2 2 0 105.999 18a2 2 0 00-.001-4zm10.001 0A2 2 0 1016 18a2 2 0 000-4zm10.001 0A2 2 0 1026.001 18 2 2 0 0026 14z"
            ></path>
          </svg>
        </div>

        <form @submit.prevent class="StationFilter">
          <button
            @click="toogleSearch"
            class="fas fa-search btn-search"
          ></button>
          <div @click="toogleOps" class="sort-container">
            <p>Custom order</p>

            <div class="fas fa-sort-down"></div>
          </div>
          <input
            :class="{ show: isShow }"
            type="text"
            @input="sendFilter"
            v-model="filterBy.search"
            placeholder="Search in playlist"
            autocomplete="off"
          />
          <div :class="{ hidden: isOps }" class="list-ops playlist-ops">
            <ul>
              <li>Custom order</li>
              <li @click="sortByTitle">Title</li>
              <li @click="sortByDate">Date added</li>
              <li @click="sortByDuration">Duration</li>
            </ul>
          </div>
        </form>
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
  props: ['isLiked'],
  data() {
    return {
      isLike: this.isLiked,
      filterBy: { search: '', sort: '' },
      isShow: false,
      isOps: false,
    };
  },
  created() {},
  methods: {
    disLikePlaylist() {
      this.toogleLike();
      this.$emit('togglePlaylistLike');
    },
    sendFilter() {
      this.$emit('filter', { ...this.filterBy });
    },

    sortByTitle() {
      this.filterBy.sort ="title"
      this.$emit('filter', { ...this.filterBy });
    },
    sortByDate() {
      this.filterBy.sort ="date"
      this.$emit('filter', { ...this.filterBy });
    },
    sortByDuration() {
      this.filterBy.sort ="duration"
      this.$emit('filter', { ...this.filterBy });
    },

    likePlaylist() {
      this.toogleLike();
      this.$emit('togglePlaylistLike');
    },
    toogleLike() {
      this.isLike = !this.isLike;
    },
    playFirstSong() {
      this.$emit('playFirstSong');
    },
    toogleSearch() {
      this.isShow = !this.isShow;
    },
    toogleOps() {
      this.isOps = !this.isOps;
    },
  },
};
</script>
