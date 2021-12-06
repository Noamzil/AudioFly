<template>
  <form class="login-modal" >
      <label>
          Username:
          <input type="text" v-model="username">
      </label>
      <label>
          Password: 
          <input type="password" v-model="password">
      </label>
      <button class="action-btn">LogIn</button>
      <p>Not a member? <button class="link-btn">sign here</button></p>
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

<style>

</style>