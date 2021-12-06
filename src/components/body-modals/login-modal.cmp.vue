<template>
  <form class="login-modal" @submit.prevent="$emit('logUser', user)">
      <label>
          Username:
          <input type="text" v-model="user.username">
      </label>
      <label>
          Password: 
          <input type="password" v-model="user.password">
      </label>
      <button class="action-btn">LogIn</button>
      <p>Not a member? <button @click="$emit('openModal', 'signup-modal')" 
      class="link-btn">sign here</button></p>
  </form>
</template>

<script>
export default {
name: 'login-modal',
data() {
    return {
        user: {
            username: '',
            password: '',
        }
    }
},
methods: {
}
}
</script>
