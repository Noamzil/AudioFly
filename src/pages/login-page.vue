<template>
  <div class="login-page-section">
    <img class="logo" src="../assets/logo1.png" />
    <h1 class="welcome">Welcome</h1>
    <h2>Login to continue</h2>
    <form class="auth-page login" @submit.prevent="logUser">
      <div class="input-container flex">
        <input
          name="username"
          type="text"
          placeholder="Username"
          v-model="user.username"
        />
        <div class="fas fa-user"></div>
      </div>
      <div class="input-container flex">
        <input
          name="password"
          type="Password"
          placeholder="Password"
          v-model="user.password"
        />
        <div class="far fa-eye-slash"></div>
      </div>
      <button class="login-btn">Log in</button>
      <h4>OR</h4>
      <hr>
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
      return;
    },
  },
};
</script>
