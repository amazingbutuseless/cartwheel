<template>
    <div>
        <app-header></app-header>
        <websie-container></websie-container>
    </div>
</template>  

<script lang="ts">
import Vue from 'vue';
import AppHeader from './components/AppHeader.vue';
import WebsiteContainer from './components/WebsiteContainer.vue';

export default Vue.extend({
    name: 'App',
    components: {
        AppHeader,
        WebsiteContainer,
    } 
});
</script>

<style lang="scss">
    @import './scss/global';
</style>
