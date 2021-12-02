import { apiService } from '../services/api.service.js'

export const playStore = {
    state: {
        searchedSongId: ''
    },
    getters: {
        songIdToPlay({ searchedSongId }) { return searchedSongId }
    },
    mutations: {
        search(state, { songId }) {
            state.searchedSongId = songId
        }
    },
    actions: {
        async search({ commit }, { key }) {
            try {
                const songId = await apiService.getVideoId(key)
                commit({ type: 'search', songId })
            } catch (err) {
                console.log('could not get a song id in playStore', err);
            }
        }
    },
}