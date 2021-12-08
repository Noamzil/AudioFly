<template>
  <section>
    <h1>Edit Details</h1>
    <form class="edit-playlist-modal" @submit="$emit('updatePlaylist')">
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
        <label>
          Playlist Name:
          <input type="text" v-model="currPlaylist.name" />
        </label>
        <label class="playlist-desc">
          Description:
          <textarea type="text" v-model="currPlaylist.discription" />
        </label>
        <div>
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

        <!-- <label>
          Tags:
          <select v-model="currTag" @change="tagPlaylist">
            <option v-for="tag in tags" :key="tag">{{ tag }}</option>
          </select>
        </label>
        <ul>
          <li v-for="tag in currPlaylist.tags" :key="tag">{{ tag }}</li>
        </ul> -->
        <button>SAVE</button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: "editPlaylistModal",
  props: ["currPlaylist"],
  data() {
    return {
      // options: [
      //   {
      //     value: "Option1",
      //     label: "Option1",
      //   },
      //   {
      //     value: "Option2",
      //     label: "Option2",
      //   },
      // ],
      value1: this.currPlaylist.tags || [],
    };
  },
  methods: {
    loadImg(ev) {
      this.$emit("loadImg", ev, "playlist");
    },
    tagPlaylist() {
      this.$emit("tagPlaylist", this.currTag);
      this.currTag = "";
    },
  },
  computed: {
    tags() {
      return this.$store.getters.tags;
    },
    options() {
      var tags = this.tags
      const options = tags.map(tag => {
        return {
          value: tag,
          label: tag
        }
      })
      return options
    }
  },
};
</script>
