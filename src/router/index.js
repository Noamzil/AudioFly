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
    path: '/playlist/:playlistId',
    name: 'playlist',
    component: () => import('../pages/playlist-page.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;

var YOUTUBEAPIKEY = 'AIzaSyCAwn2YlmL22UvEHK4xAiPBwgb5OSU1Teg';
var serachFor = `the weekend`;
var ResultNum = 1;

// how you search for a video
var search_http = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${ResultNum}&q=${serachFor}&key=${YOUTUBEAPIKEY}`;
console.log('search_http: ', search_http);
// how you get a video details

var videoId = 'XXYlFuWEuKI';

var video_http = `https://www.googleapis.com/youtube/v3/videos?part=snippet&maxResults=${ResultNum}&id=${videoId}&key=${YOUTUBEAPIKEY}`;
console.log('video_http: ', video_http);

// how you wathc the video

var watch_http = `https://www.youtube.com/watch?v=${videoId}&part=snippet&maxResults=${ResultNum}key=${YOUTUBEAPIKEY}`;
console.log('watch_http: ', watch_http);

var getVideo = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YOUTUBEAPIKEY}&q=${serachFor}`
console.log(getVideo)