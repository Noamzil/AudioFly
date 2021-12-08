<template>
  <form class="auth-page signup" @submit.prevent="signUser">
      <label for="user-img-select" class="img-select-container">
          <img :src="user.imgUrl" alt="Choose Image" class="user-avatar">
          <input type="file" id="user-img-select" accept="image/png, image/jpeg" @change="loadImg" hidden>
      </label>
          <h1>Username:</h1>
          <input type="text" v-model="user.username">
          <h1>Password:</h1>
          <input type="password" v-model="user.password">
          <h1>Re-enter Password:</h1>
          <input type="password" v-model="rePassword">
          <h1>Email:</h1>
          <input type="password" v-model="user.email">      <button class="action-btn">Sign up</button>
      <hr>
      <p>Already a member?</p>
      <button @click="$router.push('/login')" 
      class="link-btn">Log here</button>
  </form>
</template>

<script>
import {uploadImg} from '../services/upload-service.js'
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
        rePassword: ''
    }
},
created() {
    this.user.imgUrl = require('../assets/logo1.png')
},
methods: {
   async loadImg(ev) {
      try {
        const res = await uploadImg(ev)
        this.userImg = res.url
      } catch (err) {
        console.log('Couls not upload image', err);
      }
    },
    async signUser() {
      if (this.user.password === this.rePassword) 
        try {
          await this.$store.dispatch({ type: 'signUp', user: this.user });
          if (this.$store.getters.user.username === this.user.username) {
          this.$router.push('/')
          }
        } catch (err) {
          console.log('Could not Sign user', err);
        }
    },
},
watch: {
    userImg() {
        this.user.imgUrl = this.userImg
    }
}
}
</script>
