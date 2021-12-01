import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './style/style.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

const getContent = (search) => {
  const url = new URL('https://itunes.apple.com/search');
  const params = { term: search, media: 'musicVideo' };
  url.search = new URLSearchParams(params);
  fetch(url, { method: 'POST' })
    .then((results) => results.json())
    .then((data) => {
      console.log(data);
    });
};

getContent('stan');
