<template>
  <div class="notifications">
    <ul>
      <li
        v-for="invitation in invitations"
        :key="invitation.id"
        @click="goToStation(invitation.playlist)"
      >
        <notification-prev :invitation="invitation" />
      </li>
    </ul>
  </div>
</template>

<script>
import NotificationPrevCmp from "./notification-prev.cmp.vue";
import notificationPrev from "./notification-prev.cmp.vue";
export default {
  name: "notifications",
  props: ["invitations"],
  data() {
    return {
      msg: "",
    };
  },
  methods: {
      goToStation(stationtId) {
                this.$router.push("/playlist/" + stationtId);
                this.$emit('toggleNotification')
      }
  },
  components: {
    notificationPrev,
  },
};
</script>
