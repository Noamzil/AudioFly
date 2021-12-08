<template>
  <div class="list-ops">
    <ul>
      <li @click="share">Share</li>
      <li @click="removeSong">Reomve</li>
      <li @click="addToQueue">Add to queue</li>
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
    addToQueue() {
      // console.log(this.song);
      console.log(`addToQueue`);
      const entity = this.song
      this.$store.commit({type:'addToQueue', entity })
    },
    share() {
      console.log(`share`);
    },
  },
};
</script>
