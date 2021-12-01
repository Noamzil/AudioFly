import { userService } from '../services/user.service.js'

export const userStore = {
    state: {
        users: [],
        currUser: userService.getSessionUser() || null,
    },
    getters: {

    },
    mutations: {
        logIn(state, { user }) {
            state.user = user
        },
        logOut(state) {
            state.user = null
        },
        signUp(state, { user }) {
            state.users.push(user)
        },
        likeSong(state, { song }) {
            state.currUser.liked.push(song)
        },
        addFriend(state, { user }) {
            state.currUser.friends.push(user)
        },
        removeFriend(state, { userId }) {
            const idx = null
            state.currUser.friends.splice(idx, 1)
        }
    },
    actions: {
        logIn({ commit }, { user }) {

        },
        logOut({ commit }) {
        },
        signUp({ commit }, { user }) {
            commit.signUp(user)
            commit.logIn(user)
        },
        likeSong({ commit }, { song }) {
            song.type = 'song'
        },
        addFriend({ commit }, { user }) {
        },
        removeFriend({ commit }, { userId }) {
        }
    },
}