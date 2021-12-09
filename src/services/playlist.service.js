import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';
import { httpService } from './http.service.js';

const PLAYLIST_URL = 'playlist/';
// process.env.NODE_ENV !== 'development'
//   ? '/api/playlist/'
//   : '//localhost:3030/api/playlist/';

const PLAYLIST_KEY = 'audioFlyPlaylistsDB';
const SONG_KEY = 'audioFlySongsDB';

// _createPlaylists();
export const playlistService = {
  query,
  getPlaylistById,
  addPlaylist,
  updatePlaylist,
  removePlaylist,
  filterPlaylist,
  getEmptyPlaylist,
};
async function query() {
  try {
    const playlists = await httpService.get(PLAYLIST_URL)
    // const playlists = await storageService.query(PLAYLIST_KEY);
    return playlists;
  } catch (err) {
    console.log('Could not get playlists in playlistService', err);
    throw err;
  }
}
async function getPlaylistById(id) {
  try {
    const playlist = await httpService.get(PLAYLIST_URL + id)
    // const playlist = await storageService.get(PLAYLIST_KEY, id);
    console.log(id);
    return playlist;
  } catch (err) {
    console.log('Could not find playlist in getById in playlistService');
    throw err;
  }
}
async function addPlaylist(playlist) {
  try {
    const newPlaylist = await httpService.post(PLAYLIST_URL, playlist)
    // const newPlaylist = await storageService.post(PLAYLIST_KEY, playlist);
    return newPlaylist;
  } catch (err) {
    console.log('Could not add playlist at playlistService');
    throw err;
  }
}
async function updatePlaylist(playlist) {
  try {
    const updatedPlaylist = await httpService.put(PLAYLIST_URL, playlist)
    // const updatedPlaylist = await storageService.put(PLAYLIST_KEY, playlist);
    return updatedPlaylist;
  } catch (err) {
    console.log('Could not update playlist at playlistService');
    throw err;
  }
}
async function removePlaylist(id) {
  try {
    await httpService.delete(PLAYLIST_URL, id) // Pay attention!!!
    // await storageService.remove(PLAYLIST_KEY, id);
  } catch (err) {
    console.log('Could not remove playlist at playlist service');
    throw err;
  }
}

function filterPlaylist(songs, filterBy) {
  if (filterBy.search) {
    songs = songs.filter((song) => {
      return song.title.toLowerCase().includes(filterBy.search.toLowerCase());
    });
  }

  if (filterBy.sort === 'title')
    songs.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
      return 0;
    });

  if (filterBy.sort === 'date') {
    songs.sort((a, b) => {
      return b.addedAt - a.addedAt;
    });
  }

  if (filterBy.sort === 'duration') {
    songs.forEach((song) => {
      var a = song.duration.split(':');
      song.duration = +a[0] * 60 + +a[1];
    });
    songs.sort((a, b) => {
      return a.duration - b.duration;
    });
    songs.forEach((song) => {
      song.duration = utilService.secToStr(song.duration);
    });
  }
  return songs;
}

function getEmptyPlaylist() {
  const playlist = {
    type: 'playlist',
    playlistImg: ``,
    createdBy: {
      username: '',
      _id: '',
    },
    createdAt: new Date(Date.now()),
    likes: 0,
    tags: [],
    name: '',
    discription: '',
    time: 0,
    songs: [],
  };
  return playlist;
}
// _createPlaylists()
// test-data
function _createPlaylists() {
  var playlists = localStorage.getItem(PLAYLIST_KEY);
  if (playlists) return;
  playlists = [
    _createStation(4),
    _createPlaylist(3),
    _createPlaylist(1),
    _createPlaylist(4),
    _createPlaylist(2),
    _createStation(3),
    _createPlaylist(5),
    _createStation(2),
    _createStation(5),
    _createStation(1),
  ];
  localStorage.setItem(PLAYLIST_KEY, JSON.stringify(playlists));
}
function _createPlaylist(num) {
  const playlist = {
    _id: utilService.makeId(),
    type: 'playlist',
    playlistImg: `https://www.liveabout.com/thmb/pwO4o_iDrZRTmmhs7eOfD25Qoqw=/1500x1125/smart/filters:no_upscale()/pop-music-57bce3863df78c87634ea806.jpg`,
    createdBy: {
      username: 'Udi Ofly',
      _id: 'u101',
    },
    createdAt: num,
    likes: num,
    tags: utilService.makeTags(2),
    name: 'My Playlist' + num,
    discription: 'Lorem ipsum, dolor sit amet consectetur!',
    time: 0,
    songs: [
      {
        type: 'song',
        youtubeId: 'XXYlFuWEuKI',
        title: 'The Weekend - Save Your Tears',
        img: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        duration: '03:00',
        addedAt: new Date(Date.now()),
      },
      {
        type: 'song',
        youtubeId: '_Yhyp-_hX2s',
        title: 'Eminem - Lose Yourself',
        img: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        duration: '03:00',
        addedAt: new Date(Date.now()),
      },
      {
        type: 'song',
        youtubeId: 'NF-kLy44Hls',
        title: 'Duft Punk - Lose Yourself To Dance',
        img: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        duration: '03:00',
        addedAt: new Date(Date.now()),
      },
      {
        type: 'song',
        youtubeId: 'Q0oIoR9mLwc',
        title: 'Red Hot Chili Peppers - Dark Necessities',
        img: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        duration: '03:00',
        addedAt: new Date(Date.now()),
      },
    ],
  };
  return playlist;
}
function _createStation(num) {
  const playlist = {
    _id: utilService.makeId(),
    type: 'station',
    playlistImg: `https://www.liveabout.com/thmb/pwO4o_iDrZRTmmhs7eOfD25Qoqw=/1500x1125/smart/filters:no_upscale()/pop-music-57bce3863df78c87634ea806.jpg`,
    createdBy: {
      username: 'Udi Ofly',
      _id: 'u101',
    },
    createdAt: num,
    likes: num,
    tags: utilService.makeTags(2),
    name: 'My Station' + num,
    discription: 'Lorem ipsum, dolor sit amet consectetur!',
    time: 80000000,
    songs: [
      {
        type: 'song',
        youtubeId: 'XXYlFuWEuKI',
        title: 'The Weekend - Save Your Tears',
        img: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        duration: '03:00',
        addedAt: new Date(Date.now()),
      },
      {
        type: 'song',
        youtubeId: '_Yhyp-_hX2s',
        title: 'Eminem - Lose Yourself',
        img: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        duration: '03:00',
        addedAt: new Date(Date.now() + 5),
      },
      {
        type: 'song',
        youtubeId: 'NF-kLy44Hls',
        title: 'Duft Punk - Lose Yourself To Dance',
        img: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        duration: '03:00',
        addedAt: new Date(Date.now() - 10),
      },
      {
        type: 'song',
        youtubeId: 'Q0oIoR9mLwc',
        title: 'Red Hot Chili Peppers - Dark Necessities',
        img: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
        duration: '03:00',
        addedAt: new Date(Date.now() - 5),
      },
    ],
  };
  return playlist;
}
