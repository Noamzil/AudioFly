<template>
    <header class="main-header">
        <user-nav></user-nav>
        <div>  
              <button @click="nextHistory"><svg role="img" focusable="false" viewBox="0 0 24 24" ><polyline points="16 4 7 12 16 20" fill="none"></polyline></svg></button>
              <button @click="prevHistory"><svg role="img" focusable="false" viewBox="0 0 24 24" ><polyline points="8 4 17 12 8 20" fill="none"></polyline></svg></button>
        </div>
    </header>
</template>

<script>
import userNav  from './user-nav.cmp.vue';
export default {
    name: 'app-header',
    methods: {
        nextHistory() {
            console.log('Going to the next page on your history');
        },
        prevHistory() {
            console.log('Going to the previous page on your history');
        }
    },
    components: {
        userNav,
    }
}
</script>

