<template>
  <div class="playedNowDetails">
    <div class="artistImg"><img :src="currSong.img" /></div>
    <div class="songDescription">
      <p class="title">{{ currSong.title }}</p>
    </div>
    <template v-if="pressed">
      <button class="LikeBtn" @click="disLike">
        <svg role="img" viewBox="0 0 16 16">
          <path
            d="M13.764 2.727a4.057 4.057 0 00-5.488-.253.558.558 0 01-.31.112.531.531 0 01-.311-.112 4.054 4.054 0 00-5.487.253A4.05 4.05 0 00.974 5.61c0 1.089.424 2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 002.726 0l4.435-5.195A4.052 4.052 0 0014.96 5.61a4.057 4.057 0 00-1.196-2.883zm-.722 5.098L8.58 13.048c-.307.36-.921.36-1.228 0L2.864 7.797a3.072 3.072 0 01-.905-2.187c0-.826.321-1.603.905-2.187a3.091 3.091 0 012.191-.913 3.05 3.05 0 011.957.709c.041.036.408.351.954.351.531 0 .906-.31.94-.34a3.075 3.075 0 014.161.192 3.1 3.1 0 01-.025 4.403z"
          ></path>
        </svg>
      </button>
    </template>
    <template v-else>
      <button class="LikeBtn" @click="like">
        <svg role="img" class="heart-clicked" viewBox="0 0 16 16">
          <path fill="none" d="M0 0h16v16H0z"></path>
          <path
            d="M13.797 2.727a4.057 4.057 0 00-5.488-.253.558.558 0 01-.31.112.531.531 0 01-.311-.112 4.054 4.054 0 00-5.487.253c-.77.77-1.194 1.794-1.194 2.883s.424 2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 002.726 0l4.435-5.195a4.052 4.052 0 001.195-2.883 4.057 4.057 0 00-1.196-2.883z"
          ></path>
        </svg>
      </button>
    </template>
    <div class="icon">
      <button>
        <svg xmlns="http://www.w3.org/2000/svg">
          <g fill="currentColor" fill-rule="evenodd">
            <path
              d="M1 3v9h14V3H1zm0-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"
              fill-rule="nonzero"
            ></path>
            <path d="M10 8h4v3h-4z"></path>
          </g>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'played-note-details',
  data() {
    return {
      pressed: false,
    };
  },
  methods: {
    disLike() {
      this.tooglePressed();
    },
    like() {
      this.tooglePressed();
    },
    tooglePressed() {
      this.pressed = !this.pressed;
    },
  },
  computed: {
    currSong() {
      return this.$store.getters.currSong;
    },
  },
};
</script>
