// const YOUTUBEAPIKEY = "AIzaSyCAwn2YlmL22UvEHK4xAiPBwgb5OSU1Teg"; // elior
const YOUTUBEAPIKEY = "AIzaSyC0bJTtOXo5KJTAeYz5nzVqN8N8OJQyFR4"; // or
// Or YouTube key AIzaSyC0bJTtOXo5KJTAeYz5nzVqN8N8OJQyFR4
const axios = require('axios')
// import Axios from 'axios'
// var axios = Axios.create({
//     withCredentials: true
// })


// getVideo: `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${this.YOUTUBEAPIKEY}&q=${this.serachFor}`,

export const apiService = {
    getVideoId
}

async function getVideoId(key) {
    try {
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&videoEmbeddable=true&type=video&key=${YOUTUBEAPIKEY}&q=${key}`)
        // const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=theweekend&key=AIzaSyCAwn2YlmL22UvEHK4xAiPBwgb5OSU1Teg`)
        const songs = res.data.items.map(song => {
            return {
                ytId: song.id.videoId,
                name: song.snippet.titel
            }
        })
        return songId
    } catch (err) {
        console.log('Error geting song from youTube', err);
        throw err
    }
}

