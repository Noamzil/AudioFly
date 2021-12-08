const YOUTUBEAPIKEY = 'AIzaSyCQ-PEdSmyAJhd86KUTBN2hlQUGv--dUQ0';

//ELIOR'S KEY = AIzaSyCAwn2YlmL22UvEHK4xAiPBwgb5OSU1Teg
// OR'S KEY = AIzaSyC0bJTtOXo5KJTAeYz5nzVqN8N8OJQyFR4
//Noam's KEY = AIzaSyDjWXGiL77YK1-4bOnP4knERUmni3_GPp8
// extra key = AIzaSyCQ-PEdSmyAJhd86KUTBN2hlQUGv--dUQ0
//and another one =AIzaSyAWkIrHccCMiaw5q4iGxR3l02lrQW6FgtY
//Noam's KEY2 = AIzaSyAX9NuBOs9TVWwRbPaktZDChfrUmPXHhX4

const axios = require('axios');
// import Axios from 'axios'
// var axios = Axios.create({
//     withCredentials: true
// })

// getVideo: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&type=video&key=${this.YOUTUBEAPIKEY}&q=${this.serachFor}`,

export const apiService = {
  getVideoId,
  getVideoLength,
  // getFourVideoDetails,
};

async function getVideoId(key) {
  // console.log(`in api req`);
  try {
    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?regionCode=us&videoDuration=short&lr=en&videoCategoryId=10&part=snippet&maxResults=5&type=video&key=${YOUTUBEAPIKEY}&q=${key}`
    );
    // console.log(res.data);
    const songs = res.data.items.map((song) => {
      return {
        youtubeId: song.id.videoId,
        title: song.snippet.title,
        img: song.snippet.thumbnails.default.url,
        type: 'song'
      };
    });
    // console.log(songs);
    return songs;
  } catch (err) {
    console.log('Error geting song from youTube');
    throw err;
  }
}
async function getVideoLength(id) {
  console.log(`in api req`, id);
  try {
    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=contentDetails&key=${YOUTUBEAPIKEY}`
    );
    return res.data.items[0].contentDetails.duration;
  } catch (error) {
    throw error;
  }
}
