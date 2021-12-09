<template>
  <div class="list-ops">
    <ul>
      <li @click="share">Share</li>
      <li @click="removeSong">Reomve</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'list-ops',
  props: ['song'],
  methods: {
    removeSong() {
      this.$emit('removeSong', this.song);
    },
    share() {
      this.$emit('closeModal');
      console.log(`share`);
    },
  },
};
</script>
