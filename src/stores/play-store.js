import { apiService } from '../services/api.service.js'

export const playStore = {
    state: {
        searchedSongs: [],
        currSong: {},
        currTime: 0
    },
    getters: {
        songsRes({ searchedSongs }) { return searchedSongs },
        currSong({ currSong }) { return currSong },
        // currPlaylist({ currPlaylist }) { return currPlaylist },
        currTime({ currTime }) { return currTime }

    },
    mutations: {
        search(state, { songs }) {
            state.searchedSongs = songs
        },
        playSong(state, { song }) {
            state.currSong = song
        },
        currPlaylist(state, { playlist }) {
            state.currPlaylist = playlist
        },
        currTime(state) {
            state.currTime += 1
            console.log(state.currTime)
        },
        changeCurrTime(state) {
            console.log('im here');
            state.currTime = 0
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