import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'


const PLAYLIST_URL = (process.env.NODE_ENV !== 'development')
    ? '/api/playlist/'
    : '//localhost:3030/api/playlist/'

const PLAYLIST_KEY = 'audioFlyPlaylistsDB'
const SONG_KEY = 'audioFlySongsDB'

_createSongs()
_createPlaylists()
export const playlistService = {
    query,
    getPlaylistById,
    getSongById,
    addPlaylist,
    updatePlaylist,
    removePlaylist,
    addSong,
}
async function query() {
    try {
        const playlists = await storageService.query(PLAYLIST_KEY)
        return playlists
    } catch (err) {
        console.log('Could not get playlists in playlistService', err);
        throw err
    }
}
async function getPlaylistById(id) {
    try {
        const playlist = await storageService.get(PLAYLIST_KEY, id)
        return playlist
    } catch (err) {
        console.log('Could not find playlist in getById in playlistService');
        throw err
    }
}
async function getSongById(id) {
    try {
        const song = await storageService.get(SONG_KEY, id)
        return song
    } catch (err) {
        console.log('Could not find song in getById in playlistService');
        throw err
    }
}
async function addPlaylist(playlist) {
    try {
        const newPlaylist = await storageService.post(PLAYLIST_KEY, playlist)
        return newPlaylist
    } catch (err) {
        console.log('Could not add playlist at playlistService');
        throw err
    }
}
async function addSong(song) {
    try {
        const newSong = await storageService.post(SONG_KEY, song)
        return newSong
    } catch (err) {
        console.log('Could not add song at playlisyService');
        throw err
    }
}
async function updatePlaylist(playlist) {
    try {
        const updatedPlaylist = await storageService.put(PLAYLIST_KEY, playlist)
    } catch (err) {
        console.log('Could not update playlist at playlistService');
        throw err
    }
}
async function removePlaylist(id) {
    try {
        await storageService.remove(PLAYLIST_KEY, id)
    } catch (err) {
        console.log('Could not remove playlist at playlist service');
        throw err
    }
}


// test-data
function _createPlaylists() {
    var playlists = localStorage.getItem(PLAYLIST_KEY)
    if (playlists) return
    playlists = [
        _createPlaylist(1),
        _createPlaylist(2),
        _createPlaylist(3),
        _createPlaylist(4),
        _createPlaylist(5)
    ]
    localStorage.setItem(PLAYLIST_KEY, JSON.stringify(playlists))
}
function _createPlaylist(num) {
    const playlist = {
        _id: utilService.makeId(),
        type: 'playlist',
        playlistImg: `../assets/img/test-data/playlist${num}.jpg`,
        createdBy: {
            userName: 'Udi Ofly',
            _id: 'u101'
        },
        likes: 50,
        tags: utilService.makeTags(2),
        name: 'My Playlist' + num,
        discription: 'Lorem ipsum, dolor sit amet consectetur!',
        time: 80000000,
        songs: [],
    }
    return playlist
}
function _createSongs() {
    var songs = localStorage.getItem(SONG_KEY)
    if (songs) return
    songs = [
        _createSong(1),
        _createSong(2),
        _createSong(3),
        _createSong(4),
        _createSong(5),
        _createSong(6),
    ]
    localStorage.setItem(SONG_KEY, JSON.stringify(songs))
}
function _createSong(name) {
    const song = {
        _id: utilService.makeId(),
        type: 'song',
        songName: name + '',
        artist: 'aminem',
        time: utilService.makeLength(),
        album: 'aminem ' + name,
        youTubeUrl: `../assets/img/test-data/eminem${name}.jpg`,
        url: null,
    }
    return song
}

