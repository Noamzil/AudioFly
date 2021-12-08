<template>
  <section class="flex side-bar-container">
    <div class="logo-container" role="banner">
      <router-link to="/" class="logo">
        <div class="flex side-bar-img-container">
          <img src="../assets/logo2.png" />
          <img src="../assets/logo2-txt.png" class="logo-txt" />
        </div>
      </router-link>
    </div>
    <div class="pages-btns-container">
      <router-link to="/" class="side-bar-icon">
        <svg role="img" class="home-icon" viewBox="0 0 24 24">
          <path
            d="M9 14h6v7h5V7.8l-8-4.6-8 4.6V21h5v-7zm1 8H3V7.2L12 2l9 5.2V22h-7v-7h-4v7z"
          ></path>
        </svg>
        <h3>Home</h3>
      </router-link>
      <router-link to="/search" class="side-bar-icon">
        <svg role="img" class="search-icon" viewBox="0 0 24 24">
          <path
            d="M16.736 16.262A8.457 8.457 0 0019 10.5a8.5 8.5 0 10-3.779 7.067l4.424 5.18 1.521-1.299-4.43-5.186zM10.5 17C6.916 17 4 14.084 4 10.5S6.916 4 10.5 4 17 6.916 17 10.5 14.084 17 10.5 17z"
          ></path>
        </svg>
        <h3>Search</h3>
      </router-link>
      <router-link to="/library" class="flex side-bar-icon">
        <svg role="img" class="collection-icon" viewBox="0 0 24 24">
          <path
            d="M13.66 4.097l-.913.406 7.797 17.513.914-.406L13.66 4.097zM3 22h1V4H3v18zm6 0h1V4H9v18z"
          ></path>
        </svg>
        <h3>Your Library</h3>
      </router-link>
    </div>

    <div class="action-btns-container">
      <div class="flex side-bar-icons-container">
        <router-link to="/playlist/new">
          <div class="create-playlist-icon flex square-icon">
            <svg role="img" aria-hidden="true" viewBox="0 0 16 16">
              <path d="M14 7H9V2H7v5H2v2h5v5h2V9h5z"></path>
              <path fill="none" d="M0 0h16v16H0z"></path>
            </svg>
          </div>
        </router-link>
        <!-- <router-link to="/playlist/new"> -->
        <h1 @click="createNewPlaylist" class="action-txt">Add Playlist</h1>
        <!-- </router-link> -->
      </div>
      <!-- <router-link to="/liked-songs"> -->
      <div @click="$router.push('/liked-songs')" class="side-bar-icons-container">
        <div class="liked-songs-icon flex square-icon">
          <svg role="img" aria-hidden="true" viewBox="0 0 16 16">
            <path fill="none" d="M0 0h16v16H0z"></path>
            <path
              d="M13.797 2.727a4.057 4.057 0 00-5.488-.253.558.558 0 01-.31.112.531.531 0 01-.311-.112 4.054 4.054 0 00-5.487.253c-.77.77-1.194 1.794-1.194 2.883s.424 2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 002.726 0l4.435-5.195a4.052 4.052 0 001.195-2.883 4.057 4.057 0 00-1.196-2.883z"
            ></path>
          </svg>
        </div>
        <h1 class="action-txt">Liked Songs</h1>
      </div>
      <!-- </router-link> -->
    </div>

    <hr />
    <sidebarPlaylist />
  </section>
</template>

<script>
import sidebarPlaylist from './sidebar-playlist.cmp.vue';
import { playlistService } from '../services/playlist.service.js';

export default {
  name: 'sidebar',
  data() {
    return {
      newPlaylist: null,
    };
  },
  created() {},
  methods: {
    createNewPlaylist() {
      this.$store.dispatch({
        type: 'createNewPlaylist',
      });
      // this.newPlaylist = playlistService.getEmptyPlaylist();
      // var user = this.$store.getters.user;

      // this.newPlaylist.createdBy = { username: user.username, _id: user._id };
      // this.newPlaylist.name = `My playlist #` + this.getPlaylistsAmount;
      // console.log(this.newPlaylist);

      // this.newPlaylist._id = `1`;

      // this.$store.dispatch({
      //   type: 'updatePlaylist',
      //   playlist: this.newPlaylist,
      // });
      // this.$router.push(`/playlist/${this.newPlaylist._id}`);
    },
  },
  computed: {
    getPlaylistsAmount() {
      return this.$store.getters.user.playlists.length + 1;
    },
  },
  components: {
    sidebarPlaylist,
  },
};
</script>
