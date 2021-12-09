import { storageService } from '../services/async-storage.service.js'
import { userService } from '../services/user.service.js'
import { eventBus } from '../services/event-bus.cmp.js'
export const userStore = {
    state: {
        users: [],
        currUser: null,
        realUser: true,
    },
    getters: {
        users({ users }) { return users },
        user({ currUser }) { return currUser },
        userLikedSongs({ currUser }) { return currUser.liked.song },
        realUser({ realUser }) { return realUser }
    },
    mutations: {
        loadUser(state) {
            state.currUser = userService.getSessionUser() || null
            if (state.currUser.username === 'Guest') state.realUser = false;
        },
        setCurrUser(state, { user }) {
            state.currUser = user;
            state.realUser = true;
        },
        logOut(state) {
            state.realUser = false;
        },
        signUp(state, { user }) {
            state.users.push(user)
        },
        addFriend(state, { user }) {
            state.currUser.friends.push(user)
        },
        removeFriend(state, { userId }) {
            const idx = null
            state.currUser.friends.splice(idx, 1)
        },
    },
    actions: {
        async logIn({ commit }, { user }) {
            try {
                const loggedUser = await userService.logIn(user)
                if (!loggedUser) {
                    eventBus.$emit('showMsg', 'User was not found')
                    return
                }
                commit({ type: 'setCurrUser', user: loggedUser })
                eventBus.$emit('showMsg', `Wellcome ${user.username}`)
            } catch (err) {
                console.log('Could not logIn user in userStore', err);
            }
        },
        async logOut({ commit }) {
            try {
                await userService.logOut()
                commit({ type: 'loadUser' })
                commit({ type: 'logOut' })
                eventBus.$emit('showMsg', 'GoodBye')
            } catch {
                console.log('Could not logOut user in userStore', err);
            }
        },
        async signUp({ commit }, { user }) {
            try {
                const signedUser = await userService.signUp(user)
                commit({ type: 'signUp', signedUser })
                commit({ type: 'setCurrUser', user: signedUser })
                eventBus.$emit('showMsg', `Wellcome ${user.username}`)
            } catch (err) {
                console.log('Could not signUp user in userStore', err);
            }
        },
        async addLike({ commit }, { entity }) {
            try {
                const updatedUser = await userService.addLike(entity)
                commit({ type: 'setCurrUser', user: updatedUser })
                eventBus.$emit('showMsg', `New ${entity.type} added to your favorites`)
            } catch (err) {
                console.log('Could not add like in userStore', err);
            }
        },
        async removeLike({ commit }, { entity }) {
            try {
                const updatedUser = await userService.removeLike(entity)
                commit({ type: 'setCurrUser', user: updatedUser })
                var songStr =  entity.type.charAt(0).toUpperCase() + entity.type.slice(1);
                eventBus.$emit('showMsg', ` ${songStr} removed from your favorites`)
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