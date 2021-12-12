<template>
  <div class="login-page-section">
    <img class="logo" src="../assets/logo1.png" />
    <form class="auth-page login sign-up" @submit.prevent="signUser">
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
      <div class="input-container flex">
        <input
          name="password"
          type="Password"
          placeholder="Re-enter Password:"
          v-model="rePassword"
        />
        <div class="far fa-eye-slash"></div>
      </div>
      <div class="input-container flex">
        <input
          name="email"
          type="email"
          placeholder="Email:"
          v-model="user.email"
        />
        <i class="far fa-envelope"></i>
      </div>

      <button class="login-btn sign-up-btn">Sign up</button>
      <h4 class="sign-up">OR</h4>
      <hr />
      <p>Already a member?</p>
      <button @click="$router.push('/login')" class="link-btn">Log here</button>
    </form>
  </div>
</template>

<script>
import { uploadImg } from '../services/upload-service.js';
export default {
  name: 'signup-modal',
  props: ['userImg'],
  data() {
    return {
      user: {
        username: '',
        password: '',
        email: '',
        imgUrl: '',
      },
      rePassword: '',
    };
  },
  created() {
    this.user.imgUrl = require('../assets/logo1.png');
  },
  methods: {
    async loadImg(ev) {
      try {
        const res = await uploadImg(ev);
        this.userImg = res.url;
      } catch (err) {
        console.log('Couls not upload image', err);
      }
    },
    async signUser() {
      if (this.user.password === this.rePassword)
        try {
          await this.$store.dispatch({ type: 'signUp', user: this.user });
          if (this.$store.getters.user.username === this.user.username) {
            this.$router.push('/');
          }
        } catch (err) {
          console.log('Could not Sign user', err);
        }
    },
  },
  watch: {
    userImg() {
      this.user.imgUrl = this.userImg;
    },
  },
};
</script>
