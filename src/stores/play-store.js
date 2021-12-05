import { apiService } from '../services/api.service.js'

export const playStore = {
    state: {
        searchedSongs: [],
        currSong: {},
    },
    getters: {
        songsRes({ searchedSongs }) { return searchedSongs },
        currSong({ currSong }) { return currSong },
    },
    mutations: {
        search(state, { songs }) {
            state.searchedSongs = songs
        },
        playSong(state, { song }) {
            state.currSong = song
        },
    },
    actions: {
        async search({ commit }, { key }) {
            try {
                const songs = await apiService.getVideoId(key)
                commit({ type: 'search', songs })
            } catch (err) {
                console.log('could not get a song id in playStore', err);
            }
        },


    },
}