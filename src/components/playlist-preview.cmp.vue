<template>
  <article class="playlist-preview">
    <div class="low-layer" :class="isHighlight">
    <div class="high-layer" @mouseover="highlight=true" 
    @mouseleave="highlight=false" @click="goToPlaylist">
      <img class="playlist-img" :src="playlist.playlistImg"/>
      <h1 class="playlist-name">{{playlist.name}}</h1>
      <div class="song-name-container">
      <span v-for="song in first2Songs" :key="song.youtubeId">{{song.title}}|</span>
      </div>
      <button :class="isHighlight">go</button>
    </div>
    </div>
  </article>
</template>

<script>
export default {
    name: 'playlistPreview',
    props: ['currPlaylist'],
    data() {
        return {
            playlist: null,
            highlight: false,
        }
    },
    created() {
        // console.log(this.currPlaylist);
        this.playlist = JSON.parse(JSON.stringify(this.currPlaylist))
    },
    methods: {
        goToPlaylist() {
            this.$router.push('/playlist/'+this.playlist._id)
        }
        },
    computed: {       
        isHighlight() {
            return this.highlight ? 'highlight' : ''
        },
        first2Songs() {
            return this.playlist.songs.slice(0,2)
        }
    },

}
</script>