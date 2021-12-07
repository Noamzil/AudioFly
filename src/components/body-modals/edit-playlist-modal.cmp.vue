<template>
<form class="edit-playlist-modal" @submit="$emit('updatePlaylist')">
    <!-- <label for="playlist-img-edit">
        <img :src="currPlaylist.playlistImg">
        <input id="playlist-img-edit" type="file" accept="image/jpeg image/png" 
        @change="loadImg" hidden>
    </label> -->
    <label>
        Playlist Name:
        <input type="text" v-model="currPlaylist.name">
    </label>
    <label>
        Discription: 
        <input type="text" v-model="currPlaylist.discription">
    </label>
    <ul>
        <li v-for="tag in currPlaylist.tags" :key="tag">{{tag}}</li>
    </ul>
    <label>
        Tags: 
        <select v-model="currTag" @change="tagPlaylist">
            <option v-for="tag in tags" :key="tag">{{tag}}</option>
        </select>
    </label>
    <button>Save</button>
</form>
  
</template>

<script>
export default {
    name: 'editPlaylistModal',
    props: ['currPlaylist'],
    data() {
        return {
            currTag: '',
        }
    },
    methods: {
        loadImg(ev) {
            this.$emit('loadImg', ev, 'playlist')
        },
        tagPlaylist() {
            this.$emit('tagPlaylist', this.currTag)
            this.currTag = ''
        }
    },
    computed: {
        tags() {
            return this.$store.getters.tags
        }
    }
}
</script>
