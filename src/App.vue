<template>
  <section>
    <app-header></app-header>
    <div id="app">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <router-view />
    </div>
    <app-side-bar/>
    <app-footer></app-footer>
  </section>
</template>

<script>
import appHeader from './components/app-header.cmp.vue';

import appSideBar from './components/side-bar.cmp.vue'
import appFooter from './components/app-footer.cmp.vue';

export default {
  components: {
    appHeader,
    appFooter,
    appSideBar
  },
};
</script>
