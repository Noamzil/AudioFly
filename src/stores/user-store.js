import { storageService } from '../services/async-storage.service.js'
import { userService } from '../services/user.service.js'

export const userStore = {
    state: {
        users: [],
        currUser: null
    },
    getters: {
        users({ users }) { return users },
        user({ currUser }) { return currUser },
        userLikedSongs({currUser}) {return currUser.liked.song }
    },
    mutations: {
        loadUser(state) {
            state.currUser = userService.getSessionUser() || null
        },
        setCurrUser(state, { user }) {
            state.currUser = user
        },
        logOut(state) {
            state.currUser = null
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
        async logIn({ commit }, { user }) {
            try {
                const loggedUser = await userService.logIn(user)
                commit({ type: 'setCurrUser', user: loggedUser })
            } catch (err) {
                console.log('Could not logIn user in userStore', err);
            }
        },
        async logOut({ commit }) {
            try {
                await userService.logOut()
                commit({ type: 'logOut' })
            } catch {
                console.log('Could not logOut user in userStore', err);
            }
        },
        async signUp({ commit }, { user }) {
            try {
                const signedUser = await userService.post(user)
                commit({ type: 'signUp', signedUser })
                commit({ type: 'setCurrUser', user: signedUser })
            } catch (err) {
                console.log('Could not signUp user in userStore', err);
            }
        },
        async addLike({ commit }, { entity }) {
            try {
                const updatedUser = await userService.addLike(entity)
                commit({ type: 'setCurrUser', user: updatedUser })
            } catch (err) {
                console.log('Could not add like in userStore', err);
            }
        },
        async removeLike({ commit }, { entity }) {
            try {
                const updatedUser = await userService.removeLike(entity)
                commit({ type: 'setCurrUser', user: updatedUser })
            } catch (err) {
                console.log('Could not add like in userStore', err);
            }
        },
        async addFollow({ commit }, { newFollow }) {
            try {
                const updatedUser = await userService.addFollow(newFollow)
                commit({ type: 'setCurrUser', user: updatedUser })
            } catch (err) {
                console.log('Could not add follow in userStore', err);
            }
        },
        async removeFollow({ commit }, { follow }) {
            try {
                const updatedUser = await userService.removeFollow(newFollow)
                commit({ type: 'setCurrUser', user: updatedUser })
            } catch (err) {
                console.log('Could not add follow in userStore', err);
            }
        },

    },
}