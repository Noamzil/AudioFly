<template>
<section class="body-modal" v-if="modalType" @click="exitModal">
    <div class="modal-box" @click.stop="stop">
        <component :is="modalType" :userImg="userImg" @signUser="signUser" 
        @logUser="logUser" @openModal="openModal" @loadImg="loadImg">
        </component>
    </div>
</section>
  
</template>

<script>
import loginModal from './body-modals/login-modal.cmp.vue'
import signupModal from './body-modals/signup-modal.cmp.vue'
import {eventBus} from '../services/event-bus.cmp.js'
export default {
    name: 'body-modal',
    data() {
        return {
            modalType: '', 
            userImg: '',
        }
    },
    created() {
        eventBus.$on('openModal', this.openModal)
    },
    methods: {
        exitModal() {
            this.modalType = ''
        },
        openModal(type) {
            this.modalType = type
        },
        async logUser(user) {
            await this.$store.dispatch({type: 'logIn', user})
            if (this.$store.getters.user.username === user.username) {
                this.modalType = ''
            }
        },
        async signUser(user) {
            await this.$store.dispatch({type: 'signUp', user})
            if (this.$store.getters.user.username === user.username) {
                this.modalType = ''
            }        
        },
        loadImg(fileEv) {
            const img = fileEv.target.files[0];
            const reader = new FileReader()
            reader.readAsDataURL(img)
            reader.onload = ev => {
                this.userImg = ev.target.result
            }
        },
        stop() {
            
        },
    },
    components: {
        loginModal,
        signupModal
    }

}
</script>
