<template>
<form class="edit-playlist-modal">
    <label>
        Playlist Name:
        <input type="text" v-model="playlist.name">
    </label>
</form>
  
</template>

<script>
export default {
    name: 'editPlaylistModal',
    props: ['currPlaylist'],
    data() {
        return {
            playlist: null
        }
    },
    async created() {
        this.playlist = JSON.parse(JSON.stringify(this.currPlaylist))
    }
}
</script>
