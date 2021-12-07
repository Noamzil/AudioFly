import { storageService } from '../services/async-storage.service.js';
import { playlistService } from '../services/playlist.service.js';

export const playlistStore = {
  state: {
    playlists: [],
    albums: [],
    likedSongs: [],
    currPlaylist: null,
    filterBy: null,
  },
  getters: {
    playlists({ playlists }) {
      return playlists;
    },
    currPlaylist({ currPlaylist }) {
      return currPlaylist;
    },
  },
  mutations: {
    loadPlaylists(state, { playlists }) {
      state.playlists = playlists;
    },
    addPlaylist(state, playlist) {
      state.playlists.push(playlist);
    },
    updatePlaylist({ playlists }, { updatedPlaylist }) {
      const idx = playlists.findIndex(
        (currPL) => updatedPlaylist._id === currPL._id
      );
      playlists.splice(idx, 1, updatedPlaylist);
    },
    removePlaylist(state, { playlistId }) {
      console.log(playlistId);
      const idx = state.playlists.findIndex(
        (currPL) => currPL._id === playlistId
      );
      state.playlists.splice(idx, 1);
    },
    setCurrPlaylist(state, { playlist }) {
      state.currPlaylist = playlist;
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy;
      console.log(`in store set filtet by to`, filterBy);
    },
  },
  actions: {
    async loadPlaylists({ commit }, { filterBy }) {
      try {
        const playlists = await playlistService.query(filterBy);
        commit({ type: 'loadPlaylists', playlists });
      } catch (err) {
        console.log('Could not load playlists at playlistStore', err);
      }
    },
    async addPlaylist({ commit }, { playlist }) {
      try {
        const newPlaylist = await playlistService.addPlaylist(playlist);
        console.log(newPlaylist);
        commit({ type: 'addPlaylist', newPlaylist });
      } catch (err) {
        console.log('Could not add playlists at playlistStore', err);
      }
    },
    async updatePlaylist({ commit }, { playlist }) {
      try {
        const updatedPlaylist = await playlistService.updatePlaylist(playlist);
        commit({ type: 'updatePlaylist', updatedPlaylist });
      } catch (err) {
        console.log('Could not update playlists at playlistStore', err);
      }
    },
    async removePlaylist({ commit }, { playlistId }) {
      try {
        await playlistService.removePlaylist(playlistId);
        commit({ type: 'removePlaylist', playlistId });
      } catch (err) {
        console.log('Could not remove playlists at playlistStore', err);
      }
    },
    async setCurrPlaylist({ commit }, { playlistId }) {
      try {
        const playlist = await playlistService.getPlaylistById(playlistId);
        commit({ type: 'setCurrPlaylist', playlist });
      } catch (err) {
        console.log('Could not set playlist at playlistStore', err);
      }
    },
    setFilter({ commit, dispatch }, { filterBy }) {
      commit({ type: 'setFilter', filterBy });
      dispatch({ type: 'loadPlaylists', filterBy });
    },
  },
};
