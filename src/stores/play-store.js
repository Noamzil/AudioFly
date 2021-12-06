import { apiService } from '../services/api.service.js';

export const playStore = {
  state: {
    searchedSongs: [],
    currSong: {},
    currTime: 0,
    isSongOn: false,
  },
  getters: {
    songsRes({ searchedSongs }) {
      return searchedSongs;
    },
    currSong({ currSong }) {
      return currSong;
    },
    currTime({ currTime }) {
      return currTime;
    },
    isSongOn({ isSongOn }) {
      return isSongOn;
    },
  },
  mutations: {
    search(state, { songs }) {
      state.searchedSongs = songs;
    },
    playSong(state, { song }) {
      state.currSong = song;
    },
    continueSong(state) {
      state.isSongOn = true;
    },
    stopSong(state) {
      state.isSongOn = false;
    },
    currPlaylist(state, { playlist }) {
      state.currPlaylist = playlist;
    },
    currTime(state) {
      state.currTime += 1;
      console.log(state.currTime);
    },
    changeCurrTime(state) {
      console.log('im here');
      state.currTime = 0;
    },
  },
  actions: {
    async search({ commit }, { key }) {
      try {
        const songs = await apiService.getVideoId(key);
        commit({ type: 'search', songs });
      } catch (err) {
        console.log('could not get a song id in playStore', err);
      }
    },
  },
};
