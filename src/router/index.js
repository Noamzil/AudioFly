import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'homePage',
    component: () => import('../pages/home-page.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../pages/search-page.vue'),
  },
  {
    path: '/playlist/:playlistId',
    name: 'playlist',
    component: () => import('../pages/playlist-page.vue'),
  },

];

const router = new VueRouter({
  routes,
});

export default router;
