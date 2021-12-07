import { Result } from 'element-ui';
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
    path: '/queue',
    name: 'queue',
    component: () => import('../pages/queue-page.vue'),
  },
  {
    path: '/liked-songs',
    name: 'liked-songs',
    component: () => import('../pages/liked-songs-page.vue'),
  },
  {
    path: '/playlist/:playlistId',
    name: 'playlist',
    component: () => import('../pages/playlist-page.vue'),
  },
  {
    path: '/library',
    name: 'library',
    component: () => import('../pages/library-page.vue'),
  },
  {
    path: '/genre/:genreType',
    name: 'genre',
    component: () => import('../pages/genre-page.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
