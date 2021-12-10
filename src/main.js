import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './stores/index.js';
import './style/style.scss';
import Element from 'element-ui';
import VueYoutube from 'vue-youtube';
import VueSocketIO from 'vue-socket.io';
import io from 'socket.io-client'



Vue.use(new VueSocketIO({
  debug: true,
  connection: io('http://localhost:3030'),
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_"
  }
})
);


Vue.use(Element);
Vue.use(VueYoutube);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
