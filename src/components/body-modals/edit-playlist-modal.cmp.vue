<template>
  <section>
    <div class="edit-head-container">
      <h1>Edit Details</h1>
      <button class="close-btn" @click="$emit('exitModal')">X</button>
    </div>
    <form class="edit-playlist-modal" @submit.prevent="updatePlaylist">
      <div class="playlist-img-container">
        <label for="playlist-img-edit">
          <img :src="currPlaylist.playlistImg" class="playlist-img" />
          <input
            id="playlist-img-edit"
            type="file"
            accept="image/jpeg image/png"
            @change="loadImg"
            hidden
          />
        </label>
      </div>
      <div class="edit-playlist-container">
          <input type="text" v-model="currPlaylist.name" />
          <textarea type="text" v-model="currPlaylist.discription" />
        <div class="tags-container">
          <h1>Tags:</h1>
          <el-select v-model="value1" multiple placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </form>
        <button @click="updatePlaylist" class="save-btn">SAVE</button>
  </section>
</template>

<script>
import { eventBus} from '../../services/event-bus.cmp.js';
export default {
  name: 'editPlaylistModal',
  props: ['currPlaylist'],
  data() {
    return {
      value1: this.currPlaylist.tags || [],
    };
  },
  methods: {
    loadImg(ev) {
      this.$emit('loadImg', ev, 'playlist');
    },
    tagPlaylist() {
      this.currPlaylist.tags = [];
      this.currPlaylist.tags = [...this.value1];
      this.value1 = '';
    },
    updatePlaylist() {
      this.tagPlaylist();
      eventBus.$emit('updateCurrPlaylist', this.currPlaylist);
      this.$emit('updatePlaylist', this.currPlaylist);
    },
  },
  computed: {
    tags() {
      return this.$store.getters.tags;
    },
    options() {
      var tags = this.tags;
      const options = tags.map((tag) => {
        return {
          value: tag,
          label: tag,
        };
      });
      return options;
    },
  },
};
</script>
