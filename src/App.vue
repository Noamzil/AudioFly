<template>
  <section class="main-app-container">
    <app-header />
    <div id="app">
      <router-view />
    </div>
    <app-side-bar />
    <app-footer />
  </section>
</template>

<script>
import appHeader from './components/app-header.cmp.vue';
import appSideBar from './components/side-bar.cmp.vue';
import appFooter from './components/app-footer.cmp.vue';


export default {
  components: {
    appHeader,
    appFooter,
    appSideBar,
  },
};
</script>
