<template>
    <div>
        <app-header />
        <website-container />
    </div>
</template>  


<script lang="ts">
    import Vue from 'vue';

    import store from './store/index';

    import AppHeader from './components/AppHeader.vue';
    import WebsiteContainer from './components/WebsiteContainer.vue';

    export default Vue.extend({
        name: 'App',
        
        store,

        components: {
            AppHeader,
            WebsiteContainer,
        },

        beforeCreate() {
            this.$store.dispatch('setAvailableWebsites');
        },
    });
</script>


<style lang="scss">
    @import './scss/global';
</style>
