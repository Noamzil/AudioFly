import { storageService } from '../services/async-storage.service.js';
import { playlistService } from '../services/playlist.service.js'

export const playlistStore = {
    state: {
        playlists: [],
        albums: [],
        likedSongs: [],
    },
    getters: {

    },
    mutations: {
        loadPlaylists(state, { playlists }) {
            state.playlists = playlists
        },
        addPlaylist(state, { playlist }) {
            state.playlists.push(playlist)
        },
        updatePlaylist({ playlists }, { playlist }) {
            const idx = playlists.findIndex(currPL => playlist._id === currPL._id);
            playlists.splice(idx, 1, playlist)
        },
        removePlaylist({ playlists }, { playlistId }) {
            const idx = playlists.findIndex(currPL => currPL._id === playlistId)
            state.playlists.splice(idx, 1)
        }
    },
    actions: {
        async loadPlaylists({ commit }) {
            try {
                const playlists = await playlistService.query()
                commit({ type: 'loadPlaylists', playlists })
            } catch (err) {
                console.log('Could not load playlists at playlistStore', err);
            }
        },
        async addPlaylist({ commit }, { playlist }) {
            try {
                const newpPlaylist = playlistService.addPlaylist(playlist)
                commit({ type: 'addPlaylist', newpPlaylist })
            } catch (err) {
                console.log('Could not add playlists at playlistStore', err);
            }
        },
        async updatePlaylist({ commit }, { playlist }) {
            try {
                const updatedPlaylist = playlistService.updatePlaylist(playlist)
                commit({ type: 'updatePlaylist', updatedPlaylist })
            } catch (err) {
                console.log('Could not update playlists at playlistStore', err);
            }
        },
        async removePlaylist({ commit }, playlistId) {
            try {
                await playlistService.removePlaylist(playlistId)
                commit({ type: 'removePlaylist', playlistId })
            } catch (err) {
                console.log('Could not remove playlists at playlistStore', err);
            }
        }
    },
}