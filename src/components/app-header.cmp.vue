<template>
  <header
    :class="[!isTopScreen ? 'moving-header' : tag]"
    class="flex main-header"
  >
    <section class="flex left-side-header">
      <div>
        <button @click="prevHistory" :class="isPrev ? 'active' : ''">
          <svg role="img" focusable="false" viewBox="0 0 24 24">
            <polyline points="16 4 7 12 16 20" fill="none"></polyline>
          </svg>
        </button>
        <button @click="nextHistory" :class="isNext ? 'active' : ''">
          <svg role="img" focusable="false" viewBox="0 0 24 24">
            <polyline points="8 4 17 12 8 20" fill="none"></polyline>
          </svg>
        </button>
      </div>
      <div class="flex input-container" v-if="route === '/search'">
        <svg role="img" class="search-icon-input" viewBox="0 0 24 24">
          <path
            d="M16.736 16.262A8.457 8.457 0 0019 10.5a8.5 8.5 0 10-3.779 7.067l4.424 5.18 1.521-1.299-4.43-5.186zM10.5 17C6.916 17 4 14.084 4 10.5S6.916 4 10.5 4 17 6.916 17 10.5 14.084 17 10.5 17z"
          ></path>
        </svg>
        <form @submit.prevent="search" action="">
          <input type="search" v-model="searchTxt" placeholder="Search Songs" />
        </form>
      </div>
    </section>
    <section style="display: flex">
      <div class="notification-container" @click="toggleNotifications">
        <h1 class="bell"><i class="far fa-bell"></i></h1>
        <div v-if="notification" class="notifications-num">
        </div>
      </div>
      <notifications
        v-if="openNotifi"
        :invitePlaylist="invitePlaylist"
        :inviteUser="inviteUser"
        :invitations="invitations"
        @toggleNotification="toggleNotifications"
      />
      <div class="flex login-container">
        <template v-if="!$store.getters.realUser">
          <button @click="$router.push('/login')" class="login-btn">
            Login
          </button>
        </template>
        <user-nav @logOut="$emit('logOut')"></user-nav>
      </div>
    </section>
  </header>
</template>

<script>
import userNav from './user-nav.cmp.vue';
import notifications from '../components/notifications.cmp.vue';
import { eventBus } from '../services/event-bus.cmp.js';
import { playlistService } from '../services/playlist.service.js';

export default {
  name: 'app-header',
  props: ['notification', 'invitePlaylist', 'inviteUser', 'invitations'],
  data() {
    return {
      isNext: false,
      isPrev: false,
      searchTxt: '',
      currPagePath: null,
      isTopScreen: true,
      currPlaylist: null,
      isHome: false,
      tag: 'defult',
      openNotifi: false,
    };
  },
  async created() {
    this.tag = await this.$store.getters.currHomeTag;
    console.log(this.tag);
    window.addEventListener('scroll', this.handleScroll);
    const { playlistId } = this.$route.params;
    if (playlistId) {
      this.currPlaylist = await this.$store.getters.currPlaylist;
    }
  },
  methods: {
    nextHistory() {
      this.isNext = !this.isNext;
      if (this.currPagePath === this.$router.currentRoute.path) return;
      if (this.currPagePath) this.$router.push(this.currPagePath);
      // console.log("Going to the next page on your history");
    },
    prevHistory() {
      this.isPrev = !this.isPrev;
      this.currPagePath = this.$router.history.current.path;
      this.$router.back();
      // console.log("Going to the previous page on your history");
    },
    search() {
      const key = this.searchTxt;
      this.$store.dispatch({ type: 'search', key });
      this.$store.commit({ type: 'searchPlaylists', key });
    },
    openModal(type) {
      eventBus.$emit('openModal', type);
    },
    handleScroll(event) {
      var pageY = event.path[1].pageYOffset;
      if (!pageY) {
        this.isTopScreen = true;
      } else this.isTopScreen = false;
    },
    toggleNotifications() {
      this.openNotifi = !this.openNotifi;
    },
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    route() {
      return this.$route.path;
    },
    getTag() {
      var tag = this.$store.getters.currHomeTag;
      console.log(tag);
      console.log(this.currPlaylist);
      if (this.currPlaylist) {
        if (!this.currPlaylist.tags.length) {
          this.tag = 'pink';
        } else this.tag = this.currPlaylist.tags[0];
      } else if (this.isHome) {
        this.tag = 'defult';
      }
    },
  },
  watch: {
    '$route.params': {
      async handler() {
        const { playlistId } = this.$route.params;
        if (playlistId) {
          const playlist = await playlistService.getPlaylistById(playlistId);
          this.currPlaylist = JSON.parse(JSON.stringify(playlist));
          this.getTag;
          this.isHome = false;
        } else {
          if (this.$route.name === 'liked-songs') {
            this.isHome = true;
            this.tag = 'purple';
          } else {
            this.isHome = true;
            this.tag = 'defult';
          }
        }
      },
    },
    searchTxt() {
      setTimeout(() => {
        this.search()
      }, 500)
    }
  },
  components: {
    userNav,
    notifications,
  },
};
</script>
