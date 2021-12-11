<template>
  <section>
    <h1>{{ invitationMsg }}</h1>
  </section>
</template>

<script>
export default {
  name: "notification-prev",
  props: ["invitation"],
  methods: {
    stationName(playlistId) {
      const playlists = this.$store.getters.playlists;
      return playlists.find((playlist) => playlist._id === playlistId).name;
    },
  },
  computed: {
    invitationMsg() {
      const userName = this.invitation.user.username;
      const playlistId = this.invitation.playlist;
      const stationName = this.stationName(playlistId);
      return `${userName} invited you to listen to ${stationName} station`;
      return userName
    },
  },
};
</script>
