

<template>
<section>
<app-header></app-header>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</section>
</template>

<script>
import appHeader from './components/app-header.cmp.vue'
export default {
  components: {
    appHeader
  }
}
</script>



