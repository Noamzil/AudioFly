<template>
  <section class="footer">
    <played-note-details />
    <song-progress />
  </section>
</template>

<script>
import playedNoteDetails from './footer-cmps/played-note-details.cmp.vue';
import songProgress from './footer-cmps/song-progress.cmp.vue';

export default {
  name: 'app-footer',
  data() {
    return {};
  },
  components: {
    playedNoteDetails,
    songProgress,
  },
};
</script>
