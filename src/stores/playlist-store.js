import { storageService } from '../services/async-storage.service.js';
import { playlistService } from '../services/playlist.service.js';
import router from '../router/index';
import {
  socketService,
  SOCKET_EVENT_SHARE_STATION,
  SOCKET_EVENT_REVIEW_ABOUT_YOU,
} from '../services/socket.service';

export const playlistStore = {
  state: {
    playlists: [],
    albums: [],
    likedSongs: [],
    currPlaylist: null,
    tags: [
      'Pop',
      'Rock',
      'Indie',
      'Hip-Hop',
      'Podcasts',
      'Charts',
      'Discover',
      'Concerts',
      'Mood',
      'Chill',
      'Party',
      'Focus',
      'Alternative',
      'EQUAL',
      'DanceElectronic',
      'Wellness',
      'Sleep',
      'Tastemakers',
      'Decades',
      'Funk',
      'Punk',
      'Rap',
      'Singer-Songwriter',
      'Alternative Rock',
      'jazz',
    ],
    relatedPlaylists: null
  },
  getters: {
    playlists({ playlists }) {
      return playlists;
    },
    currPlaylist({ currPlaylist }) {
      return currPlaylist;
    },
    tags({ tags }) {
      return tags;
    },
    relatedPlaylists({relatedPlaylists}) {return relatedPlaylists}
  },
  mutations: {
    loadPlaylists(state, { playlists }) {
      state.playlists = playlists;
    },
    addPlaylist(state, { playlist }) {
      state.playlists.push(playlist);
      console.log(playlist);
      router.push(`/playlist/${playlist._id}`);
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
    shufflePlaylist(state) {
      var songs = state.currPlaylist.songs;
      let currentIndex = songs.length;
      let randomIndex = null;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [songs[currentIndex], songs[randomIndex]] = [
          songs[randomIndex],
          songs[currentIndex],
        ];
      }
      return songs;
    },
    searchPlaylists(state, {key}) {
      var playlists = state.playlists
      state.relatedPlaylists = playlistService.searchPlaylists(playlists, key)
    },
  },
  actions: {
    async loadPlaylists({ commit }) {
      try {
        const playlists = await playlistService.query();
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
    async createNewPlaylist({ commit, getters }) {
      try {
        var newPlaylist = playlistService.getEmptyPlaylist();
        const { _id, username } = getters.user;
        newPlaylist.createdBy = { username, _id };
        newPlaylist.name = `New Playlist`;
        newPlaylist = await playlistService.addPlaylist(newPlaylist);
        commit({ type: 'addPlaylist', playlist: newPlaylist });
      } catch (error) {
        console.log('Could not add playlist ', error);
      }
    },
    async shareStation(context) {
      try {
        const playlist = context.state.currPlaylist;
        context.commit({ type: 'setCurrPlaylist', playlist });
        socketService.off(SOCKET_EVENT_SHARE_STATION);
        socketService.on(SOCKET_EVENT_SHARE_STATION, (playlist) => {
          console.log('Got playlist from socket', playlist);
          context.commit({ type: 'addPlaylist', playlist });
        });
      } catch (err) {
        console.log('playlist store:cant invite to station', err);
        throw err;
      }
    },
  },
};
