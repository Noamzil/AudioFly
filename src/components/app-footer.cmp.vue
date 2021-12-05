<template>
  <section class="footer">
    <played-note-details />
    <song-progress />
    <device-control />
    <song-player/>
  </section>
</template>

<script>
import playedNoteDetails from './footer-cmps/played-note-details.cmp.vue';
import songProgress from './footer-cmps/song-progress.cmp.vue';
import deviceControl from './footer-cmps/device-control.cmp.vue';
import songPlayer from './footer-cmps/play-song.cmp.vue'

export default {
  name: 'app-footer',
  data() {
    return {
      isPlay: true,
    };
  },
  
  methods: {
    play() {
      this.isPlay = false
    }
  },
  components: {
    playedNoteDetails,
    songProgress,
    deviceControl,
    songPlayer,
  },
};
</script>
