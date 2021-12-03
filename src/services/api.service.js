const YOUTUBEAPIKEY = "AIzaSyC0bJTtOXo5KJTAeYz5nzVqN8N8OJQyFR4";
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
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=contentDetails&maxResults=5&videoEmbeddable=true&type=video&key=${YOUTUBEAPIKEY}&q=${key}`)
        // const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=theweekend&key=AIzaSyCAwn2YlmL22UvEHK4xAiPBwgb5OSU1Teg`)
        console.log(res.data);
        getVideoDetails()
        // const songs = res.data.items.map(song => {
        //     return {
        //         id: song.id.videoId,
        //         title: song.snippet.title,
        //         img: song.snippet.thumbnails.default.url,

        //     }
        // })
        // return songs
    } catch (err) {
        console.log('Error geting song from youTube');
        throw err
    }
}
async function getVideoDetails() {
    const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=9bZkp7q19f0&part=contentDetails&key=${YOUTUBEAPIKEY}`)
    console.log(res.data);
}

