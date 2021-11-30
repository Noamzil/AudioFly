<template>
  <div class="song-progress">
    <div class="player-control-btns">
      <div class="controlls-left">
        <button>
          <svg role="img" height="16" width="16" viewBox="0 0 16 16">
            <path
              d="M4.5 6.8l.7-.8C4.1 4.7 2.5 4 .9 4v1c1.3 0 2.6.6 3.5 1.6l.1.2zm7.5 4.7c-1.2 0-2.3-.5-3.2-1.3l-.6.8c1 1 2.4 1.5 3.8 1.5V14l3.5-2-3.5-2v1.5zm0-6V7l3.5-2L12 3v1.5c-1.6 0-3.2.7-4.2 2l-3.4 3.9c-.9 1-2.2 1.6-3.5 1.6v1c1.6 0 3.2-.7 4.2-2l3.4-3.9c.9-1 2.2-1.6 3.5-1.6z"
            ></path>
          </svg>
        </button>
        <button>
          <svg role="img" height="16" width="16" viewBox="0 0 16 16">
            <path d="M13 2.5L5 7.119V3H3v10h2V8.881l8 4.619z"></path>
          </svg>
        </button>
      </div>
      <button class="play-btn">
        <svg role="img" height="16" width="16" viewBox="0 0 16 16">
          <path d="M4.018 14L14.41 8 4.018 2z"></path>
        </svg>
      </button>

      btns
    </div>
    <div class="playback-bar">
      <p class="progress-time-start">{{ progressTimeStart }}</p>
      bar
      <p class="progress-time-end">{{ progressTimeEnd }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'song-progress',
  data() {
    return {
      progressTimeStart: '00:00',
      progressTimeEnd: '03:00',
    };
  },
};
</script>
