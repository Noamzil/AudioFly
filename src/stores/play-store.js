import { apiService } from '../services/api.service.js'

export const playStore = {
    state: {
        searchedSongs: []
    },
    getters: {
        songsRes({ searchedSongs }) { return searchedSongs }
    },
    mutations: {
        search(state, { songs }) {
            state.searchedSongs = songs
            console.log(songs);
        }
    },
    actions: {
        async search({ commit }, { key }) {
            try {
                const songs = await apiService.getVideoId(key)
                commit({ type: 'search', songs })
            } catch (err) {
                console.log('could not get a song id in playStore', err);
            }
        }
    },
}