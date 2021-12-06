<template>
  <transition name="fade">
    <div class="msg-modal" v-show="isShow">
      <h1 class="msg-txt">{{msgTxt}}</h1>
    </div>
  </transition>
</template>

<script>
import {eventBus} from '../services/event-bus.cmp.js'
export default {
  name: 'msgModal',
  data() {
    return {
      isShow: false,
      msgTxt: ''
    }
  },
  created() {
    eventBus.$on('showMsg', this.showMsg)
  },
  methods: {
    showMsg(msgTxt) {
      this.msgTxt = msgTxt;
      this.isShow = true
       setTimeout(() => {
         this.msgTxt = ''
        this.isShow = false;
      },5000)
    }
  }
}
</script>

<style>

</style>