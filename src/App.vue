<template>
  <section class="main-app-container">
    <body-modal></body-modal>
    <app-header @logOut="logOut" />
    <div id="app">
      <router-view />
    </div>
    <app-side-bar />
    <app-footer v-if="setCurrSong.youtubeId" />
    <msg-modal></msg-modal>
  </section>
</template>

<script>
import appHeader from './components/app-header.cmp.vue';
import appSideBar from './components/side-bar.cmp.vue';
import appFooter from './components/app-footer.cmp.vue';
import bodyModal from './components/body-modal.cmp.vue'
import msgModal from './components/msg-modal.cmp.vue'
export default {
  created() {
    this.$store.dispatch({type: 'loadPlaylists'})
    this.$store.commit({type: 'loadUser'})
  },
  methods: {
    logOut() {
      this.$store.dispatch({type: 'logOut'})
    }
  },
  computed: {
    setCurrSong() {
      return this.$store.getters.currSong;
    },
  },
  components: {
    appHeader,
    appFooter,
    appSideBar,
    bodyModal,
    msgModal
  },
};
</script>
