<template>
  <section class="main-app-container">
    <body-modal></body-modal>
    <app-header
      @logOut="logOut"
      :notification="notification"
      :invitePlaylist="invitePlaylist"
      :inviteUser="inviteUser"
      :invitations="invitations"
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
import appHeader from './components/app-header.cmp.vue';
import appSideBar from './components/side-bar.cmp.vue';
import appFooter from './components/app-footer.cmp.vue';
import bodyModal from './components/body-modal.cmp.vue';
import msgModal from './components/msg-modal.cmp.vue';
import { utilService } from '../src/services/util.service.js';
export default {
  created() {
    this.$store.dispatch({ type: 'loadPlaylists' });
    this.$store.commit({ type: 'loadUser' });
  },
  data() {
    return {
      notification: 0,
      invitePlaylist: [],
      inviteUser: [],
      currInvitation: null,
      invitations: [],
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch({ type: 'logOut' });
    },
  },
  computed: {
    setCurrSong() {
      return this.$store.getters.currSong;
    },
  },
  sockets: {
    invite(invitation) {
      console.log('im here in invite');
      this.currInvitation = {
        playlist: invitation.playlist,
        user: invitation.user,
        id: utilService.makeId(),
      };
      this.invitations.push(this.currInvitation);
      console.log(this.invitations);
      this.invitePlaylist.push(invitation.playlist);
      this.inviteUser.push(invitation.user);
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
