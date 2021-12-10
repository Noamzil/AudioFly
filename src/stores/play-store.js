import { apiService } from '../services/api.service.js';

export const playStore = {
  state: {
    searchedSongs: [],
    currSong: {},
    currTime: 0,
    isSongOn: false,
    queueSongs: [],
    isOnStation: false,
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
    queueSongs({ queueSongs }) {
      return queueSongs;
    },
    isOnStation({ isOnStation }){
      return isOnStation;
    }
  },
  mutations: {
    search(state, { songs }) {
      state.searchedSongs = songs;
    },
    playSong(state, { song }) {
      state.currSong = song;
      console.log(currSong);
      console.log(state.currSong);
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
    addToQueue(state, { entity }) {
      state.queueSongs.push(entity);
    },
    updateQueue(state, { updatedQueue }) {
      state.queueSongs = updatedQueue;
    },
    updateCurrTime(state, { currTime }) {
      console.log(`store`, currTime);
      state.currTime = currTime;
    },
    onStation(state) {
      state.isOnStation = true;
    },
    notOnStation(state) {
      state.isOnStation = false;
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
    updateQueue({ commit }, { Queue }) {
      try {
        commit({ type: 'updateQueue', Queue });
      } catch (err) {
        console.log('Could not update Queue at QueueStore', err);
      }
    },
  },
};
