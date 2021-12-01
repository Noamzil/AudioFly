import Axios from 'axios'
const axios = Axios.create({ withCredentials: true });

const AUTH_URL = (process.env.NODE_ENV !== 'development')
    ? '/api/auth/'
    : '//localhost:3030/api/auth/'

const USER_URL = (process.env.NODE_ENV !== 'development')
    ? '/api/user/'
    : '//localhost:3030/api/user/'

const STORAGE_KEY = 'loggedUser'

export const userService = {
    logIn,
    signUp,
    getSessionUser,
    query
}

async function query() {
    try {
        const users = await axios.get(USER_URL)
        return users.data
    } catch (err) {
        console.log('Could not get users in userService', err);
    }
}
async function logIn(user) {
    try {
        const res = await axios.post(AUTH_URL + 'login', user)
        const loggedUser = res.data
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser))
        return loggedUser
    } catch (err) {
        console.log('Could not logIn user in userService', err);
    }
}
async function signUp(user) {
    try {
        const res = await axios.post(AUTH_URL + 'signup', user)
        const signedUser = res.data
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(signedUser))
        return signedUser
    } catch (err) {
        console.log('Could notsignUp user in userService', err);
    }
}

function getSessionUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY))
}
