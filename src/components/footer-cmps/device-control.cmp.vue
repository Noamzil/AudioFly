<template>
  <section class="device-control">
    <div class="volume-bar">
      <button>
        <svg v-if="currVolume > 66" role="presentation" viewBox="0 0 16 16">
          <path
            d="M12.945 1.379l-.652.763c1.577 1.462 2.57 3.544 2.57 5.858s-.994 4.396-2.57 5.858l.651.763a8.966 8.966 0 00.001-13.242zm-2.272 2.66l-.651.763a4.484 4.484 0 01-.001 6.397l.651.763c1.04-1 1.691-2.404 1.691-3.961s-.65-2.962-1.69-3.962zM0 5v6h2.804L8 14V2L2.804 5H0zm7-1.268v8.536L3.072 10H1V6h2.072L7 3.732z"
          ></path>
        </svg>
        <svg
          v-else-if="currVolume > 33"
          role="presentation"
          viewBox="0 0 16 16"
        >
          <path
            d="M0 11.032v-6h2.802l5.198-3v12l-5.198-3H0zm7 1.27v-8.54l-3.929 2.27H1v4h2.071L7 12.302zm4.464-2.314q.401-.925.401-1.956 0-1.032-.4-1.957-.402-.924-1.124-1.623L11 3.69q.873.834 1.369 1.957.496 1.123.496 2.385 0 1.262-.496 2.385-.496 1.123-1.369 1.956l-.659-.762q.722-.698 1.123-1.623z"
          ></path>
        </svg>
        <svg v-else-if="currVolume > 0" role="presentation" viewBox="0 0 16 16">
          <path
            d="M10.04 5.984l.658-.77q.548.548.858 1.278.31.73.31 1.54 0 .54-.144 1.055-.143.516-.4.957-.259.44-.624.805l-.658-.77q.825-.865.825-2.047 0-1.183-.825-2.048zM0 11.032v-6h2.802l5.198-3v12l-5.198-3H0zm7 1.27v-8.54l-3.929 2.27H1v4h2.071L7 12.302z"
          ></path>
        </svg>
        <svg v-else role="presentation" viewBox="0 0 16 16">
          <path
            d="M0 5v6h2.804L8 14V2L2.804 5H0zm7-1.268v8.536L3.072 10H1V6h2.072L7 3.732zm8.623 2.121l-.707-.707-2.147 2.147-2.146-2.147-.707.707L12.062 8l-2.146 2.146.707.707 2.146-2.147 2.147 2.147.707-.707L13.477 8l2.146-2.147z"
          ></path>
        </svg>
      </button>
      <div
        @mouseover="isHover = true"
        @mouseleave="isHover = false"
        class="slider-container"
      >
        <input
          @input="changeVolume"
          :style="currVolumeStyle"
          v-model="currVolume"
          type="range"
          min="0"
          max="100"
          class="slider"
        />
      </div>
    </div>
    <button>
      <svg role="img" viewBox="0 0 16 16">
        <path
          d="M0 3v8c0 .55.45 1 1 1h5v-1H1V3h5V2H1c-.55 0-1 .45-1 1zm3 11.5c0 .275.225.5.5.5H6v-1H3.5c-.275 0-.5.225-.5.5zM15 2H9c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 12H9V3h6v11zm-3-8a.75.75 0 100-1.5.75.75 0 000 1.5zm0 6a2 2 0 100-4 2 2 0 000 4zm0-3c.551 0 1 .449 1 1s-.449 1-1 1-1-.449-1-1 .449-1 1-1z"
        ></path>
      </svg>
    </button>
    <router-link to="/queue">
      <button class="queue">
        <span aria-hidden="true"
          ><svg role="img" viewBox="0 0 16 16">
            <path
              d="M2 2v5l4.33-2.5L2 2zm0 12h14v-1H2v1zm0-4h14V9H2v1zm7-5v1h7V5H9z"
            ></path></svg
        ></span>
      </button>
    </router-link>
    <button>
      <svg role="img" viewBox="0 0 16 16">
        <path
          d="M8.5 1A4.505 4.505 0 004 5.5c0 .731.191 1.411.502 2.022L1.99 13.163a1.307 1.307 0 00.541 1.666l.605.349a1.307 1.307 0 001.649-.283L9.009 9.95C11.248 9.692 13 7.807 13 5.5 13 3.019 10.981 1 8.5 1zM4.023 14.245a.307.307 0 01-.388.066l-.605-.349a.309.309 0 01-.128-.393l2.26-5.078A4.476 4.476 0 007.715 9.92l-3.692 4.325zM8.5 9C6.57 9 5 7.43 5 5.5S6.57 2 8.5 2 12 3.57 12 5.5 10.429 9 8.5 9z"
        ></path>
      </svg>
    </button>
  </section>
</template>

<script>
export default {
  name: "device-control",
  data() {
    return {
      isHover: false,
      currVolume: 100,
    };
  },
  methods: {
    changeVolume() {
      this.$emit("changeVolume", this.currVolume);
    },
  },
  computed: {
    currVolumeStyle() {
      return {
        background: !this.isHover
          ? `linear-gradient(90deg, #b3b3b3 ${this.currVolume}% , #535353 ${this.currVolume}%)`
          : `linear-gradient(90deg, #1db954 ${this.currVolume}% ,#535353 ${this.currVolume}%)`,
      };
    },
  },
};
</script>

<style></style>
