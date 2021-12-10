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
    <playlist-list
      @toggleLikeSong="toggleLikeSong"
      @update="update"
      @playSong="playSong"
      :currPlaylist="currPlaylist"
      :songs="currPlaylist.songs"
    />
    <add-song
      @search="search"
      @addSong="addSong"
      @close="songsToShow = null"
      :songs="songsToShow"
    ></add-song>
  </section>
</template>

<script>
import playlistDescription from '../components/playlist-cmps/playlist-description.cmp.vue';
import playlistLinear from '../components/playlist-cmps/playlist-linear.cmp.vue';
import playlistList from '../components/playlist-cmps/song-list.cmp.vue';
import addSong from '../components/playlist-cmps/add-song.cmp.vue';
import sharePlaylist from '../components/body-modals/share-playlist-modal.vue';
import { playlistService } from '../services/playlist.service.js';
import { eventBus } from '../services/event-bus.cmp.js';
import { utilService } from '../services/util.service';
import { uploadImg } from '../services/upload-service.js';
import { apiService } from '../services/api.service.js';
import { socketService } from '../services/socket.service.js';
export default {
  name: 'playlist-page',
  data() {
    return {
      currPlaylist: null,
      songToCheck: null,
      isSearch: false,
      songsToShow: null,
      isAdmin: null,
    };
  },
  created() {
    console.log(this.$socket);
  },
  watch: {
    '$route.params.playlistId': {
      async handler() {
        const { playlistId } = this.$route.params;
        await this.$store.dispatch({ type: 'setCurrPlaylist', playlistId });
        this.currPlaylist = this.$store.getters.currPlaylist;
        this.currPlaylist = await playlistService.getPlaylistById(playlistId);
        if (this.currPlaylist.createdBy._id === this.$store.getters.user._id) {
          this.isAdmin = true;
          console.log('im admin');
        } else {
          this.$socket.emit('userJoined');
          console.log(`in else`);
        }
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
        const res = await uploadImg(fileUploadEv);
        this.currPlaylist.playlistImg = res.url;
        const playlist = this.currPlaylist;

        this.$store.dispatch({ type: 'updatePlaylist', playlist });
      } catch (err) {
        console.log('Couls not upload image', err);
      }
    },
    async search(key) {
      const songs = await apiService.getVideoId(key);
      songs.forEach((song) => {
        apiService.getVideoLength(song.youtubeId).then((length) => {
          const totalSeconds = utilService.ISOStringToSec(length);
          song.duration = utilService.secToStr(totalSeconds);
        });
      });
      this.songsToShow = songs;
    },
    playFirstSong() {
      var song = this.currPlaylist.songs[0];
      var currTime = 0;
      this.$store.commit({ type: 'updateCurrTime', currTime });
      this.$store.commit({ type: 'playSong', song });
    },
    openModal(type) {
      eventBus.$emit('openModal', type);
    },
    addSong(song) {
      song.addedAt = Date.now();
      console.log(song.addedAt);
      this.currPlaylist.songs.push(song);
      this.$store.dispatch({
        type: 'updatePlaylist',
        playlist: this.currPlaylist,
      });
      console.log(this.currPlaylist);
      this.$socket.emit('updatePlaylist', this.currPlaylist.songs);
    },
    update(songs) {
      this.currPlaylist.songs = songs;
      this.$store.dispatch({
        type: 'updatePlaylist',
        playlist: this.currPlaylist,
      });
      console.log(this.$socket);
      this.$socket.emit('updatePlaylist', songs);
    },
    playSong(song) {
      var currTime = 0;
      console.log(currTime);
      console.log(`play song`);
      this.$store.commit({ type: 'updateCurrTime', currTime });
      this.$store.commit({ type: 'playSong', song });
      this.setSong();
    },
    async setSong() {
      const currSong = this.$store.getters.currSong;
      // this.lengthStr = await apiService.getVideoLength(currSong.youtubeId);
      // this.songLength = this.ISOStringToSec(this.lengthStr);
      // this.currTimeStr = this.secToStr(this.currTime);
      // this.songLengthStr = this.secToStr(this.songLength);
      // console.log(this.$store.getters.isOnStation);
      // if (!this.$store.getters.isOnStation) {
      //   console.log('im in song progress');
      //   this.currTime = 0;
      //   this.progressPercent = 0;
      //   this.currTimeStr = this.secToStr(this.currTime);
      // }
      // this.currTimeStr = this.secToStr(this.currTime);
      // this.progressPercent = this.currTime;
      // console.log(this.currTime);
      // this.$store.commit({ type: 'notOnStation' });
      this.$emit('playNextSong');
    },
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
  sockets: {
    updatePlaylist(songs) {
      console.log('im here in update');
      this.currPlaylist.songs = songs;
      this.$store.commit({ type: 'updatePlaylist', updatedPlaylist: songs });
    },
    userJoined() {
      console.log('im here in front end, in user joined');
      if (this.isAdmin) {
        const { currSong, currTime } = this.$store.getters;
        console.log(currSong);
        console.log(currTime);
        this.$socket.emit('setSongState', { currSong, currTime });
      }
    },
    setSongState(songState) {
      console.log(songState);
      const song = songState.currSong;
      const { currTime } = songState;
      this.$store.commit({ type: 'updateCurrTime', currTime });
      this.$store.commit({ type: 'playSong', song });
    },
  },
  components: {
    playlistDescription,
    playlistLinear,
    playlistList,
    addSong,
    sharePlaylist,
  },
};
</script>
