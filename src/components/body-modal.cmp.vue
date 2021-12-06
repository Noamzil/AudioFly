<template>
<section class="body-modal" v-if="modalType" @click="exitModal">
    <div class="modal-box" @click.stop="stop">
        <component :is="modalType" ></component>
    </div>
</section>
  
</template>

<script>
import loginModal from './body-modals/login-modal.cmp.vue'
import {eventBus} from '../services/event-bus.cmp.js'
export default {
    name: 'body-modal',
    data() {
        return {
            modalType: '', 
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
        stop() {
            
        }
    },
    components: {
        loginModal,
    }

}
</script>
