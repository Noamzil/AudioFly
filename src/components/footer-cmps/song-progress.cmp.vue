<template>
  <div class="song-progress">
    <div class="player-control-btns">
      <div class="controlls-left">
        <button>
          <svg role="img" viewBox="0 0 16 16">
            <path
              d="M4.5 6.8l.7-.8C4.1 4.7 2.5 4 .9 4v1c1.3 0 2.6.6 3.5 1.6l.1.2zm7.5 4.7c-1.2 0-2.3-.5-3.2-1.3l-.6.8c1 1 2.4 1.5 3.8 1.5V14l3.5-2-3.5-2v1.5zm0-6V7l3.5-2L12 3v1.5c-1.6 0-3.2.7-4.2 2l-3.4 3.9c-.9 1-2.2 1.6-3.5 1.6v1c1.6 0 3.2-.7 4.2-2l3.4-3.9c.9-1 2.2-1.6 3.5-1.6z"
            ></path>
          </svg>
        </button>
        <button>
          <svg role="img" viewBox="0 0 16 16">
            <path d="M13 2.5L5 7.119V3H3v10h2V8.881l8 4.619z"></path>
          </svg>
        </button>
      </div>
      <button class="play-btn">
        <svg role="img" viewBox="0 0 16 16">
          <path d="M4.018 14L14.41 8 4.018 2z"></path>
        </svg>
      </button>
      <div class="controllers-right">
        <button>
          <svg role="img" viewBox="0 0 16 16">
            <path d="M11 3v4.119L3 2.5v11l8-4.619V13h2V3z"></path>
          </svg>
        </button>
        <button>
          <svg role="img" viewBox="0 0 16 16">
            <path
              d="M5.5 5H10v1.5l3.5-2-3.5-2V4H5.5C3 4 1 6 1 8.5c0 .6.1 1.2.4 1.8l.9-.5C2.1 9.4 2 9 2 8.5 2 6.6 3.6 5 5.5 5zm9.1 1.7l-.9.5c.2.4.3.8.3 1.3 0 1.9-1.6 3.5-3.5 3.5H6v-1.5l-3.5 2 3.5 2V13h4.5C13 13 15 11 15 8.5c0-.6-.1-1.2-.4-1.8z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="playback-bar">
      <div class="progress-time-start">
        <p>{{ currTimeStr }}</p>
      </div>
      <div class="slider-container">
        <input
          v-model="currTime"
          @input="changeTime"
          type="range"
          min="0"
          :max="songLength"
          id="myRange"
          class="slider"
        />
      </div>
      <div class="progress-time-end">
        <p>{{ songLengthStr }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'song-progress',
  data() {
    return {
      currTime: 0,
      currTimeStr: '',
      songLength: 180,
      songLengthStr: '',
    };
  },
  created() {
    this.currTimeStr = this.getTimeStr(this.currTime);
    this.songLengthStr = this.getTimeStr(this.songLength);
  },
  methods: {
    changeTime() {
      this.currTimeStr = this.getTimeStr(this.currTime);
    },
    getTimeStr(time) {
      var sec_num = parseInt(time, 10); // don't forget the second param
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      var seconds = sec_num - hours * 3600 - minutes * 60;

      if (seconds < 10) {
        seconds = '0' + seconds;
      }

      if (hours === 0) {
        return minutes + ':' + seconds;
      }
      
      return hours + ':' + minutes + ':' + seconds;
    },
  },
  computed: {},
};
</script>
