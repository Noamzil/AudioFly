<template>
  <article
    class="song-container"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
  >
    <button v-if="isHover" @click="$emit('playSong', song)" class="play-btn">
      <svg role="img" viewBox="0 0 24 24">
        <polygon
          points="21.57 12 5.98 3 5.98 21 21.57 12"
          fill="currentColor"
        ></polygon>
      </svg>
    </button>
    <p class="index" v-else>{{ songNum }}</p>
    <div class="flex song-details">
      <img class="song-img" :src="song.img" />
      <p>{{ song.title }}</p>
    </div>
    <p class="date-added-song">{{ dateAdded }}</p>
    <div class="song-options">
      <div class="heart-container">
        <section v-if="isHover || isSongLiked">
          <button
            @click="$emit('toggleLikeSong', song)"
            class="like-btn fa-heart"
            :class="isSongLiked ? 'fas btn-liked' : 'far'"
          ></button>
        </section>
      </div>
      <p >{{ song.duration }}</p>
      <div @click="openSongOpts" class="dots-container">
        <div v-if="isHover">• • •</div>
      </div>
      <song-ops
        @removeSong="removeSong"
        @closeModal="(showOps = false), (isHover = false)"
        :song="song"
        v-if="showOps"
      />
    </div>
  </article>
</template>

<script>
import { utilService } from '../../services/util.service.js';
import songOps from './song-options.cmp.vue';

export default {
  name: 'songPreview',
  props: ['song', 'songNum'],
  data() {
    return {
      showOps: false,
      isHover: false,
    };
  },
  computed: {
    songTime() {
      // console.log(this.song);
      return utilService.writeTime(this.song.duration);
    },
    isSongLiked() {
      const userLiked = this.$store.getters.user.liked.song;
      const isLiked = userLiked.find(
        (song) => song.youtubeId === this.song.youtubeId
      );
      return isLiked ? true : false;
    },

    dateAdded() {
      var addedAt = this.song.addedAt;
      return utilService.getRelativeTime(addedAt);
    },
  },
  methods: {
    openSongOpts() {
      this.showOps = !this.showOps;
    },
    removeSong() {
      this.$emit('removeSong', this.song);
    },
  },
  components: {
    songOps,
  },
};
</script>
