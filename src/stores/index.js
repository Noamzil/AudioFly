import Vue from 'vue'
import Vuex from 'vuex'
import { userStore } from './user-store.js'
import { playlistStore } from './playlist-store.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userStore,
    playlistStore
  }
})
