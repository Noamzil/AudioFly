<template>
  <section class="main-app-container">
    <body-modal></body-modal>
    <app-header
      @logOut="logOut"
      :notification="notification"
      :invitePlaylist="invitePlaylist"
    />
    <div id="app">
      <router-view />
    </div>
    <app-side-bar />
    <app-footer v-if="setCurrSong.youtubeId" />
    <msg-modal></msg-modal>
  </section>
</template>

<script>
import appHeader from "./components/app-header.cmp.vue";
import appSideBar from "./components/side-bar.cmp.vue";
import appFooter from "./components/app-footer.cmp.vue";
import bodyModal from "./components/body-modal.cmp.vue";
import msgModal from "./components/msg-modal.cmp.vue";
export default {
  created() {
    this.$store.dispatch({ type: "loadPlaylists" });
    this.$store.commit({ type: "loadUser" });
  },
  data() {
    return {
      notification: 0,
      invitePlaylist: null,
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch({ type: "logOut" });
    },
  },
  computed: {
    setCurrSong() {
      return this.$store.getters.currSong;
    },
  },
  sockets: {
    invite(playlistId) {
      this.invitePlaylist = playlistId;
      this.notification++;
    },
  },
  components: {
    appHeader,
    appFooter,
    appSideBar,
    bodyModal,
    msgModal,
  },
};
</script>
