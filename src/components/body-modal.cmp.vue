<template>
  <section class="body-modal" v-if="modalType" @click="exitModal">
    <div class="modal-box" @click.stop="stop">
      <component
        :is="modalType"
        :currPlaylist="currPlaylist"
        @exitModal="exitModal"
        @updatePlaylist="updatePlaylist"
      >
      </component>
    </div>
  </section>
</template>

<script>
import editPlaylistModal from './body-modals/edit-playlist-modal.cmp.vue';
import sharePlaylistModal from './body-modals/share-playlist-modal.vue';
import { eventBus } from '../services/event-bus.cmp.js';
import { playlistService } from '../services/playlist.service.js';
import { uploadImg } from '../services/upload-service.js';
export default {
  name: 'body-modal',
  data() {
    return {
      modalType: '',
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
    tagPlaylist(tag) {
      if (this.currPlaylist.tags.includes(tag)) {
        const idx = this.currPlaylist.tags.findIndex(
          (currTag) => tag === currTag
        );
        this.currPlaylist.tags.splice(idx, 1);
      } else this.currPlaylist.tags.push(tag);
      // console.log( this.currPlaylist);
      // updatePlaylist();
    },
    updatePlaylist() {
      const playlist = this.currPlaylist;
      this.$store.dispatch({ type: 'updatePlaylist', playlist });
      this.modalType = '';
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
    editPlaylistModal,
    sharePlaylistModal,
  },
};
</script>
