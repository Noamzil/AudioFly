export const userStore = {
    state: {
        playlists: [],
        albums: [],
        likedSongs: [],
        searchKey: '',
        suggestedSongs: [],
        listenHistory: [],
        songToPlay: {},
    },
    getters: {

    },
    mutations: {
        loadPlaylists(state, { playlists }) {
            state.playlists = playlists
        },
        setSuggestedSongs(state, { songs }) {
            state.suggestedSongs = songs
        },
        createPlaylist(state, { playlist }) {
            state.playlists.push(playlist)
        },
        setSongToPlay(state, { song }) {
            state.songToPlay = song
            state.listenHistory.push(song)
        }
    },
    actions: {
        search({ commit, state }) {
        },
        loadPlaylists({ commit }) {
        },
        createPlaylist({ commit }, { palylist }) {
        },
        getSong({ commit }, { song }) {
        }
    },
}