const spotify = require('spotify-web-api-node');
const spotifyApi = new spotify({
  clinetId: '62390c8d098e4c42a3adc68b4205dfc5',
  clientSecret: '8c824c425b5e451cacce9670d4c3c951',
});
spotifyApi.setAccessToken(
  'BQD0B1PR-TpA5MqnFWz9Pt1vQU_6ty15AFJo7zXH6NUYrWr43y1tq0HvB1nt4lHUbrHBntToTIuScu5kFwpOvAakC633szwhmU6qf24sp70A3Lymzh6noE-6PVweYcyYOL0ySeLwC4G3MGMC8FN5_SRRSGX8Nz8rpj4'
);

export const spotifyService = {
  getSpotify,
};

function getSpotify() {
  console.log(`in`);
  spotifyApi
    .getAlbum('1mB3W1RMqjFGLSvJNOfGPI')
    .then((res) => console.log(res.body));
}
