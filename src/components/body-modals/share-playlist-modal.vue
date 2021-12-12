<template>
  <section class="share-playlist-container">
      <div @click="copyToClipboard">
        <h1 class="clipboard"><i class="far fa-copy"></i></h1>
        <h1 >Copy to clipboard</h1>
      </div>
      <div>
        <h1><i class="fab fa-facebook"></i></h1>
        <h1>share to facebook</h1>
      </div>
      <div>
        <a :href="'whatsapp://send?text='+playlistUrl"
          data-action="share/whatsapp/share">
          <h1><i class="fab fa-whatsapp"></i></h1>
          <h1>share to whatsapp</h1>
        </a>
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
    
  },
};
</script>
