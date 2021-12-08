<template>
  <section v-if="currPlaylist" class="playlist-page">
    <playlist-description @imgUpload="imgUpload" :currPlaylist="currPlaylist" />
    <playlist-linear
      @openModal="openModal"
      @filter="setFilter"
      @togglePlaylistLike="togglePlaylistLike"
      @playFirstSong="playFirstSong"
      :isLiked="isPlaylistLiked"
    />
    <playlist-content
      @toggleLikeSong="toggleLikeSong"
      :currPlaylist="currPlaylist"
    />
    <section class="playlist-search-song" @mouseleave="isSearch=false">
      <div class="search-container">
        <button @click="isSearch=true">+</button>
        <input type="text" v-model="songToSearch" v-if="isSearch" @keyup.enter="search">
      </div>
      <div class="search-result-container">

      </div>
    </section>
  </section>
</template>

<script>
import playlistDescription from '../components/playlist-cmps/playlist-description.cmp.vue';
import playlistLinear from '../components/playlist-cmps/playlist-linear.cmp.vue';
import playlistContent from '../components/playlist-cmps/song-list.cmp.vue';
import { playlistService } from '../services/playlist.service.js';
import { eventBus } from '../services/event-bus.cmp.js';
import { utilService } from '../services/util.service';
import {uploadImg} from '../services/upload-service.js'
import {apiService} from '../services/api.service.js'
export default {
  name: 'playlist-page',
  data() {
    return {
      currPlaylist: null,
      songToCheck: null,
      isSearch: false,
      songToSearch: '',
      songsToShow: []
    };
  },
  watch: {
    '$route.params.playlistId': {
      async handler() {
        const { playlistId } = this.$route.params;
        await this.$store.dispatch({ type: 'setCurrPlaylist', playlistId });
        this.currPlaylist = this.$store.getters.currPlaylist;
      },
      immediate: true,
    },
  },
  methods: {
    setFilter(filterBy) {
      var playlist = JSON.parse(
        JSON.stringify(this.$store.getters.currPlaylist)
      );
      var fileterdSongs = playlistService.filterPlaylist(
        playlist.songs,
        filterBy
      );
      playlist.songs = fileterdSongs;
      this.currPlaylist = playlist;
    },

    async togglePlaylistLike() {
      const { _id, type } = this.currPlaylist;
      if (this.isPlaylistLiked) {
        await this.$store.dispatch({
          type: 'removeLike',
          entity: { _id, type },
        });
      } else {
        await this.$store.dispatch({ type: 'addLike', entity: { _id, type } });
      }
    },
    async toggleLikeSong(song) {
      song.type = 'song';
      this.songToCheck = song;
      if (this.isSongLiked) {
        await this.$store.dispatch({ type: 'removeLike', entity: song });
      } else {
        await this.$store.dispatch({ type: 'addLike', entity: song });
      }
    },
    async imgUpload(fileUploadEv) {
      try {
        const res = await uploadImg(fileUploadEv)
      this.currPlaylist.playlistImg = res.url
        const playlist = this.currPlaylist;
        this.$store.dispatch({ type: 'updatePlaylist', playlist });
      } catch (err) {
        console.log('Couls not upload image', err);
      }
    },
    playFirstSong() {
      var song = this.currPlaylist.songs[0];
      this.$store.commit({ type: 'playSong', song });
    },
    openModal(type) {
      eventBus.$emit('openModal', type);
    },
    async search() {
      const songs = await apiService.getVideoId(this.songToSearch)
      songs.forEach(song => {
        apiService.getVideoLength(song.youtubeId)
          .then(length => {
            const totalSeconds = utilService.ISOStringToSec(length);
            song.duration = utilService.secToStr(totalSeconds) 
          })
      })
      console.log(songs);
      this.songToSearch = ''
    }
  },
  computed: {
    isPlaylistLiked() {
      const userLiked = this.$store.getters.user.liked;
      const isLiked =
        userLiked.playlist.find(
          (playlist) => playlist._id === this.$route.params.playlistId
        ) ||
        userLiked.station.find(
          (station) => station._id === this.$route.params.playlistId
        );
      return isLiked ? true : false;
    },
    isSongLiked() {
      const userLiked = this.$store.getters.user.liked.song;
      const isLiked = userLiked.find(
        (song) => song.youtubeId === this.songToCheck.youtubeId
      );
      return isLiked ? true : false;
    },
  },
  components: {
    playlistDescription,
    playlistLinear,
    playlistContent,
  },
};
</script>
