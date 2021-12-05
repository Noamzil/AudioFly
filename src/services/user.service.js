import { storageService } from './async-storage.service.js'

const AUTH_URL = (process.env.NODE_ENV !== 'development')
    ? '/api/auth/'
    : '//localhost:3030/api/auth/'
const STORAGE_KEY = 'audioFlyLoggedUser'

const USER_URL = (process.env.NODE_ENV !== 'development')
    ? '/api/user/'
    : '//localhost:3030/api/user/'

const USERS_KEY = 'audioFlyUsersDB'
getGuest()
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
    getGuest,
    removeFollow
}

async function query() {
    try {
        const users = await storageService.query(USERS_KEY)
        return users
    } catch (err) {
        console.log('Could not get users in userService', err);
        throw err
    }
}
async function update(user) {
    try {
        var currUser = await storageService.put(user)
        sessionStorage.setItem(STORAGE_KEY, currUser)
        return currUser
    } catch (err) {
        console.log('Could not save user in userService');
        throw err
    }
}
async function logIn(user) {
    try {
        const users = await storageService.query(USERS_KEY)
        const loggedUser = users.find(currUser => user.username === currUser.username)
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser))
        return loggedUser
    } catch (err) {
        console.log('Could not logIn user in userService');
        throw err
    }
}
async function signUp(user) {
    try {
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
        console.log('Could not like song in userService');
        throw err
    }
}
async function removeLike(entity) {
    try {
        const loggedUser = getSessionUser()
        const idx = loggedUser.liked[entity.type].findIndex(currEntity => entity._id === currEntity._id)
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
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY))
}

function getGuest() {
    const guest = {
        _id: 'u101',
        fullName: 'Udi Ofly',
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
}