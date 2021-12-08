<template>
  <section class="share-playlist-modal-container">
    <h1 class="headline">Share Playlist</h1>
    <div class="share-playlist-modal">
      <div @click="copyToClipboard">
        <h1 class="clipboard"><i class="far fa-copy"></i></h1>
        <h1 >Copy to clipboard</h1>
      </div>
      <div>
        <img src="../../assets/facebook.png" alt="" />
        <h1>share to facebook</h1>
      </div>
      <div>
        <a
          :href="'whatsapp://send?text='+playlistUrl"
          data-action="share/whatsapp/share">
          <img src="../../assets/whatsapp.png" />
          <h1>share to whatsapp</h1>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "share-playlist-modal",
  data() {
    return {
        playlistUrl: window.location.href 
    };
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(this.playlistUrl);
      console.log(url);
    },
  },
};
</script>
