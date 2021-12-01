export const userStore = {
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
        createPlaylist(state, { playlist }) {
            state.playlists.push(playlist)
        },
        updatePlaylist(state, { playlist }) {
            const idx = null;
            state.playlists.splice(idx, 1, playlist)
        },
        removePlaylist(state, { playlistId }) {
            const idx = null;
            state.playlists.splice(idx, 1)
        }
    },
    actions: {
        loadPlaylists({ commit }) {
        },
        createPlaylist({ commit }, { palylist }) {
        },
        updatePlaylist({ commit }, { playlist }) {
        },
        removePlaylist({ commit }, playlistId) {
        }
    },
}