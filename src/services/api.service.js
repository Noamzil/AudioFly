const YOUTUBEAPIKEY = 'AIzaSyC0bJTtOXo5KJTAeYz5nzVqN8N8OJQyFR4';

//ELIOR'S KEY = AIzaSyCAwn2YlmL22UvEHK4xAiPBwgb5OSU1Teg
// OR'S KEY = AIzaSyC0bJTtOXo5KJTAeYz5nzVqN8N8OJQyFR4
//Noam's KEY = AIzaSyDjWXGiL77YK1-4bOnP4knERUmni3_GPp8
//Noam's KEY2 = AIzaSyAX9NuBOs9TVWwRbPaktZDChfrUmPXHhX4

const axios = require('axios');
// import Axios from 'axios'
// var axios = Axios.create({
//     withCredentials: true
// })

// getVideo: `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${this.YOUTUBEAPIKEY}&q=${this.serachFor}`,

export const apiService = {
    getVideoId,
    getVideoDetails,
};

async function getVideoId(key) {
    try {
        const res = await axios.get(
            `https://www.googleapis.com/youtube/v3/search?videoCategoryId=10&part=snippet&maxResults=5&videoEmbeddable=true&type=video&key=${YOUTUBEAPIKEY}&q=${key}`
        );
        // const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=theweekend&key=AIzaSyCAwn2YlmL22UvEHK4xAiPBwgb5OSU1Teg`)
        // console.log(res.data);

        const songs = res.data.items.map((song) => {
            return {
                id: song.id.videoId,
                title: song.snippet.title,
                img: song.snippet.thumbnails.default.url,
            };
        });
        return songs;
    } catch (err) {
        console.log('Error geting song from youTube');
        throw err;
    }
}
async function getVideoDetails(id) {
    try {
        const res = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=contentDetails&key=${YOUTUBEAPIKEY}`
        );
        return res.data.items[0].contentDetails.duration;
    } catch (error) {
        throw error;
    }
}
