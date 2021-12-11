<template>
  <section class="add-song-container">
    <div class="add-song">
      <div class="search-container">
        <svg role="img" class="search-icon-input" viewBox="0 0 24 24">
          <path
            d="M16.736 16.262A8.457 8.457 0 0019 10.5a8.5 8.5 0 10-3.779 7.067l4.424 5.18 1.521-1.299-4.43-5.186zM10.5 17C6.916 17 4 14.084 4 10.5S6.916 4 10.5 4 17 6.916 17 10.5 14.084 17 10.5 17z"
          ></path>
        </svg>
        <input
          type="text"
          v-model="songToSearch"
          @keyup.enter="search"
          placeholder="Search Songs"
        />
      </div>
    </div>
    <div class="search-result-container" v-if="songs">
      <h1 @click="$emit('close')" class="close"><i class="far fa-times-circle"></i></h1>
      <ul>
        <li v-for="song in songs" :key="song.youtubeId">
          <div>
            <img :src="song.img" />
            <h1>{{ song.title }}</h1>
          </div>
          <div>
            <h1>{{ song.duration }}</h1>
            <h1 @click="$emit('addSong', song)" class="add"><i class="fas fa-plus"></i></h1>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "addSong",
  props: ["songs"],
  data() {
    return {
      songToSearch: "",
      songsToShow: null,
    };
  },
  methods: {
    search() {
      this.$emit("search", this.songToSearch);
      this.songToSearch = "";
    },
  },
  computed: {
    only4Songs() {
      return this.songs.slice(1);
    },
  },
};
</script>
