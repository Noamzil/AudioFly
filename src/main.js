import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
var spotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new spotifyWebApi({
  clientId: '7cb954a290194f849e4c33aa883552a8',
  clientSecret: '68e9ebf38b284b428d038fb77c143f2f',
  redirectUri: 'http://localhost:8080/callback',
});

spotifyApi.setAccessToken(
  'BQD0B1PR-TpA5MqnFWz9Pt1vQU_6ty15AFJo7zXH6NUYrWr43y1tq0HvB1nt4lHUbrHBntToTIuScu5kFwpOvAakC633szwhmU6qf24sp70A3Lymzh6noE-6PVweYcyYOL0ySeLwC4G3MGMC8FN5_SRRSGX8Nz8rpj4'
);

spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
  function (data) {
    console.log('Artist albums', data.body);
  },
  function (err) {
    console.error(err);
  }
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
