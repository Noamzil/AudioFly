<template>
  <section class="playlist-page">
    <playlist-description />
    <playlist-linear />
    <playlist-content />
  </section>
</template>

<script>
import playlistDescription from '../components/playlist-cmps/playlist-description.cmp.vue';
import playlistLinear from '../components/playlist-cmps/playlist-linear.cmp.vue';
import playlistContent from '../components/playlist-cmps/playlist-content.cmp.vue';

export default {
  name: 'playlist-page',
  //   props: ['playlist'], pass to the cmps
  data() {
    return {};
  },
  components: {
    playlistDescription,
    playlistLinear,
    playlistContent,
  },
};
</script>
