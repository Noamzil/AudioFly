<template>
  <div class="login-page-section">
    <!-- <img :src="require('../assets/img/logo1.png')" /> -->
    <h1>Welcome</h1>
    <h2>Login to continue</h2>
    <form class="auth-page login" @submit.prevent="logUser">
      <h1>Username:</h1>
      <input type="text" v-model="user.username" />
      <h1>Password:</h1>
      <input type="password" v-model="user.password" />
      <button class="action-btn not-btn">LogIn</button>
      <hr />
      <p>Not a member?</p>
      <button @click="$router.push('/signup')" class="link-btn not-btn">
        sign here
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'login-page',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async logUser() {
      await this.$store.dispatch({ type: 'logIn', user: this.user });
      this.$router.push('/');
    },
  },
  computed: {
    imgSrc() {
      return ;
    },
  },
};
</script>
