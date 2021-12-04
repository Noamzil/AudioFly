<template>  
<section class="home-page">
    <h3>Playlists</h3>
    <playlists-list :playlists="playlists"></playlists-list>
</section>
</template>

<script>
import playlistsList from '../components/playlists-list.cmp.vue'
export default {
    created() {
        // console.log(this.playlists);
    },
    computed: {
        playlists() {
            return this.$store.getters.playlists
        }
    },
    components: {
        playlistsList,
    }
}
</script>

<style>

</style>