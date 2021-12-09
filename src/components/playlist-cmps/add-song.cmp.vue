<template>
  <section class="add-song" @mouseleave="isSearch=false">
      <div class="search-container">
        <button @click="isSearch=true">+</button>
        <input type="text" v-model="songToSearch" @keyup.enter="search" v-if="isSearch">
      </div>
      <div class="search-result-container" v-if="songs">
        <div class="first-result">
          <img :src="songs[0].img">
          <h1>{{songs[0].title}}</h1>
          <h1>{{songs[0].duration}}</h1>
          <button @click="$emit('addSong',songs[0])">add</button>
        </div>
        <ul>
          <li v-for="song in only4Songs" :key="song.youtubeId">
            <img :src="song.img">
            <h1>{{song.title}}</h1>
            <h1>{{song.duration}}</h1>
            <button @click="$emit('addSong', song)">add</button>
          </li>
        </ul>
        <button @click="$emit('close')">x</button>
      </div>
    </section>
</template>

<script>
export default {
    name: 'addSong',
    props: ['songs'],
    data(){
        return {
            isSearch: false,
            songToSearch: '',
            songsToShow: null,
        }
    },
    methods: {
        search() {
            this.$emit('search', this.songToSearch)
            this.songToSearch = ''
        },
    },
    computed: {
        only4Songs() {
            return this.songs.slice(1)
        },
    }
}
</script>
