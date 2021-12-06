import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './stores/index.js';
import './style/style.scss';
import Element from 'element-ui';
import VueYoutube from 'vue-youtube';

Vue.use(Element);
Vue.use(VueYoutube)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
