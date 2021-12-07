<template>
  <form class="signup-modal" @submit.prevent="signUser">
      <label for="user-img-select" class="img-select-container">
          <img :src="user.imgUrl" alt="Choose Image">
          <input type="file" id="user-img-select" accept="image/png, image/jpeg" @change="loadImg" hidden>
      </label>
      <label>
          Username:
          <input type="text" v-model="user.username">
      </label>
      <label>
          Password: 
          <input type="password" v-model="user.password">
      </label>
      <label>
          Re-enter Password: 
          <input type="password" v-model="rePassword">
      </label>
      <label>
          Email: 
          <input type="password" v-model="user.email">
      </label>
      <button class="action-btn">Sign up</button>
      <p>Already a member? <button @click="$emit('openModal', 'login-modal')" 
      class="link-btn">Log here</button></p>
  </form>
</template>

<script>
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
    this.user.imgUrl = '../../assets/logo1.png'
},
methods: {
    loadImg(ev) {
        this.$emit('loadImg', ev, 'user')
    },
    signUser() {
        if (this.user.password === this.rePassword) {
            this.$emit('signUser', this.user)
        }
    }
},
watch: {
    userImg() {
        this.user.imgUrl = this.userImg
    }
}
}
</script>
