import Vue from 'vue';
import Vuex from 'vuex';
import { userStore } from './user-store.js';
import { playlistStore } from './playlist-store.js';
import { playStore } from './play-store.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currHomeTag: '',
  },
  getters: {
    currHomeTag({ currHomeTag }) {
      console.log(currHomeTag);
      return currHomeTag;
    },
  },
  mutations: {
    setCurrHomeTag(state, { currHomeTag }) {
      state.currHomeTag = currHomeTag;
    },
  },
  actions: {},
  modules: {
    userStore,
    playlistStore,
    playStore,
  },
});
