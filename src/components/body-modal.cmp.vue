<template>
  <section class="body-modal" v-if="modalType" @click="exitModal">
    <div class="modal-box" @click.stop="stop">
      <component
        :is="modalType"
        :userImg="userImg"
        :currPlaylist="currPlaylist"
        @signUser="signUser"
        @logUser="logUser"
        @openModal="openModal"
        @loadImg="loadImg"
        @tagPlaylist="tagPlaylist"
        @updatePlaylist="updatePlaylist"
      >
      </component>
    </div>
  </section>
</template>

<script>
import loginModal from './body-modals/login-modal.cmp.vue';
import signupModal from './body-modals/signup-modal.cmp.vue';
import editPlaylistModal from './body-modals/edit-playlist-modal.cmp.vue';
import { eventBus } from '../services/event-bus.cmp.js';
import { playlistService } from '../services/playlist.service.js';
export default {
  name: 'body-modal',
  data() {
    return {
      modalType: '',
      userImg: '',
      currPlaylist: null,
    };
  },
  created() {
    eventBus.$on('openModal', this.openModal);
  },
  methods: {
    exitModal() {
      this.modalType = '';
    },
    openModal(type) {
      this.modalType = type;
    },
    async logUser(user) {
      await this.$store.dispatch({ type: 'logIn', user });
      if (this.$store.getters.user.username === user.username) {
        this.modalType = '';
      }
    },
    async signUser(user) {
      await this.$store.dispatch({ type: 'signUp', user });
      if (this.$store.getters.user.username === user.username) {
        this.modalType = '';
      }
    },
    loadImg(fileEv, type) {
      const img = fileEv.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (ev) => {
        if (type === 'user') {
          this.userImg = ev.target.result;
        } else if (type === 'playlist') {
          this.currPlaylist.playlistImg = ev.target.result;
        }
      };
    },
    tagPlaylist(tag) {
      if (this.currPlaylist.tags.includes(tag)) {
        const idx = this.currPlaylist.tags.findIndex(
          (currTag) => tag === currTag
        );
        this.currPlaylist.tags.splice(idx, 1);
      } else this.currPlaylist.tags.push(tag);
    },
    methods: {
        exitModal() {
            this.modalType = ''
        },
        openModal(type) {
            this.modalType = type
        },
        async logUser(user) {
            await this.$store.dispatch({type: 'logIn', user})
            if (this.$store.getters.user.username === user.username) {
                this.modalType = ''
            }
        },
        async signUser(user) {
            await this.$store.dispatch({type: 'signUp', user})
            if (this.$store.getters.user.username === user.username) {
                this.modalType = ''
            }        
        },
        loadImg(fileEv, type) {
            const img = fileEv.target.files[0];
            const reader = new FileReader()
            reader.readAsDataURL(img)
            reader.onload = ev => {
                if (type === 'user'){
                    this.userImg = ev.target.result
                } else if (type === 'playlist') {
                    this.currPlaylist.playlistImg = ev.target.result
                }
            }
        },
        tagPlaylist(tag) {
            if (this.currPlaylist.tags.includes(tag)) {
                const idx = this.currPlaylist.tags.findIndex(currTag => tag === currTag)
                this.currPlaylist.tags.splice(idx, 1)
            } else this.currPlaylist.tags.push(tag)

        },
        updatePlaylist() {
            const playlist = this.currPlaylist
            this.$store.dispatch({type: 'updatePlaylist', playlist})
            this.modalType = ''
        },
        stop() {},
    },
    stop() {},
  },
  watch: {
    '$route.params.playlistId': {
      async handler() {
        const { playlistId } = this.$route.params;
        if (playlistId) {
          const playlist = await playlistService.getPlaylistById(playlistId);
          this.currPlaylist = JSON.parse(JSON.stringify(playlist));
        }
      },
    },
  },
  components: {
    loginModal,
    signupModal,
    editPlaylistModal,
  },
};
</script>
