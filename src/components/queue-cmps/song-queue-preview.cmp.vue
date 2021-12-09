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

    <div class="song-options">
      <div class="heart-container">
        <section v-if="isHover || isSongLiked">
          <button
            @click="toggleLikeSong"
            class="like-btn fa-heart"
            :class="isSongLiked ? 'fas btn-liked' : 'far'"
          ></button>
        </section>
      </div>
      <p>{{ song.duration }}</p>
      <div @click="openSongOpts" class="dots-container">
        <div v-if="isHover">• • •</div>
        <queue-song-ops
          @removeSong="removeSong"
          @closeModal="(showOps = false), (isHover = false)"
          :song="song"
          v-if="showOps"
        />
      </div>
    </div>
  </article>
</template>

<script>
import { utilService } from '../../services/util.service.js';
import queueSongOps from '../queue-cmps/queue-song-ops.cmp.vue';

export default {
  props: ['song', 'songNum'],
  data() {
    return {
      showOps: false,
      isHover: false,
    };
  },
  methods: {
    async toggleLikeSong() {
      this.song.type = 'song';
      if (this.isSongLiked) {
        await this.$store.dispatch({ type: 'removeLike', entity: this.song });
      } else {
        await this.$store.dispatch({ type: 'addLike', entity: this.song });
      }
    },
    openSongOpts() {
      this.showOps = !this.showOps;
    },
    removeSong() {
      this.showOps = false;
      this.$emit('removeSong', this.song);
    },
  },
  computed: {
    isSongLiked() {
      const userLiked = this.$store.getters.user.liked.song;
      const isLiked = userLiked.findIndex(
        (song) => song.youtubeId === this.song.youtubeId
      );
      if (isLiked > -1) return true;
      return false;
    },
    dateAdded() {
      var addedAt = this.song.addedAt;
      return addedAt.slice(0, 10);
    },
  },
  components: {
    queueSongOps,
  },
};
</script>

<style></style>
