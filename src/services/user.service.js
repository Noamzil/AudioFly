import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const AUTH_URL = (process.env.NODE_ENV !== 'development')
    ? '/api/auth/'
    : '//localhost:3030/api/auth/'
const STORAGE_KEY = 'audioFlyLoggedUser'

const USER_URL = 'user/'
// (process.env.NODE_ENV !== 'development')
//     ? '/api/user/'
//     : '//localhost:3030/api/user/'

const USERS_KEY = 'audioFlyUsersDB'
// if (!JSON.parse(sessionStorage.getItem(STORAGE_KEY))) getGuest()
if (!JSON.parse(localStorage.getItem(USERS_KEY))) localStorage.setItem(USERS_KEY, JSON.stringify([]))
export const userService = {
    logIn,
    signUp,
    getSessionUser,
    query,
    logOut,
    update,
    addLike,
    removeLike,
    addFollow,
    removeFollow
}

async function query() {
    try {
        // const users = await httpService.get(USER_URL)
        const users = await storageService.query(USERS_KEY)
        return users
    } catch (err) {
        console.log('Could not get users in userService', err);
        throw err
    }
}
async function update(user) {
    try {
        // const currUser = await httpService.put(USER_URL, user)
        var currUser = await storageService.put(USERS_KEY, user)
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(currUser))
        return currUser
    } catch (err) {
        console.log('Could not save user in userService');
        throw err
    }
}
async function logIn(user) {
    try {
        // const users = await storageService.query(USERS_KEY)
        const users = await query()
        console.log(users);
        const loggedUser = users.find(currUser => user.username.toLowerCase() === currUser.username.toLowerCase())
        if (!loggedUser) return
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser))
        return loggedUser
    } catch (err) {
        console.log('Could not logIn user in userService');
        throw err
    }
}
async function signUp(user) {
    try {
        // const signedUser = await httpService.post(USER_URL, user)
        user.liked = { song: [], playlist: [], station: [], album: [] }
        user.follows = []
        user.playlists = []
        const signedUser = await storageService.post(USERS_KEY, user)
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(signedUser))
        return signedUser
    } catch (err) {
        console.log('Could not signUp user in userService');
        throw err
    }
}
async function logOut() {
    try {
        sessionStorage.removeItem(STORAGE_KEY)
    } catch {
        console.log('Could not logOut user in userService');
        throw err
    }
}
async function addLike(entity) {
    try {
        const loggedUser = getSessionUser()
        loggedUser.liked[entity.type].push(entity)
        const updetaedUser = await update(loggedUser)
        return updetaedUser
    } catch (err) {
        console.log('Could not like entity in userService');
        throw err
    }
}
async function removeLike(entity) {
    try {
        const loggedUser = getSessionUser()
        if (entity.type !== 'song') {
            var idx = loggedUser.liked[entity.type].findIndex(currEntity => entity._id === currEntity._id)
        } else {
            var idx = loggedUser.liked.song.findIndex(song => song.youtubeId === entity.youtubeId)
        }
        loggedUser.liked[entity.type].splice(idx, 1)
        const updetaedUser = await update(loggedUser)
        return updetaedUser
    } catch (err) {
        console.log('Could not like song in userService');
        throw err
    }
}
async function addFollow(newFollow) {
    try {
        const loggedUser = getSessionUser()
        loggedUser.follows.push(newFollow)
        const updetaedUser = await update(loggedUser)
        return updetaedUser
    } catch (err) {
        console.log('Could not like song in userService');
        throw err
    }
}
async function removeFollow(follow) {
    try {
        const loggedUser = getSessionUser()
        const idx = loggedUser.follows.findIndex(currFollow => follow._id === currFollow._id)
        loggedUser.follows.splice(idx, 1)
        const updetaedUser = await update(loggedUser)
        return updetaedUser
    } catch (err) {
        console.log('Could not like song in userService');
        throw err
    }
}

function getSessionUser() {
    const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || _getGuest()
    return user
}

function _getGuest() {
    const guest = {
        _id: '61b0ddc1679197742c490fa5',
        fullName: 'Udi Ofly',
        username: 'Guest',
        userEmail: 'Udi@gamil.com',
        password: '0123',
        liked: {
            song: [],
            playlist: [],
            station: [],
        },
        follows: [],
        playlists: [],
        playlistHistory: [],
        imgUrl: ''
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(guest))
    return guest
}