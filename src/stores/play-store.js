import { apiService } from '../services/api.service.js'

export const playStore = {
    state: {
        searchedSongs: [],
        currSong: {},
        isMute: true,
        isPlaying: false
    },
    getters: {
        songsRes({ searchedSongs }) { return searchedSongs },
        currSong ({currSong}) {return currSong},
        isMute({isMute}) {return isMute},
        isPlaying({isPlaying}) {return isPlaying}
    },
    mutations: {
        search(state, { songs }) {
            state.searchedSongs = songs
        },
        playSong(state, { song }) {
            state.currSong = song
        },
        unMute(state) {
            state.isMute = false
        },
        toggleAutoplay(state) {
            state.isPlaying = !state.isPlaying
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
        },
    },
}