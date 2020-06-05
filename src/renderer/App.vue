<template>
    <div>
        <app-header />
        <website-container />
    </div>
</template>  


<script lang="ts">
    import Vue from 'vue';
    import Vuex from 'vuex';

    import AppHeader from './components/AppHeader.vue';
    import WebsiteContainer from './components/WebsiteContainer.vue';

    Vue.use(Vuex);

    const store = new Vuex.Store({
        state: {
            availableWebsites: [
                {
                    key: '[ORC] local',
                    value: 'https://local.oxfordreadingclub.com',
                },
                {
                    key: '[ORC] stage',
                    value: 'https://stage.oxfordreadingclub.com',
                }
            ],
            selectedWebsite: '',

            availableTimestamps: [],
            selectedTimestamp: '',
        },

        mutations: {
            selectWebsite(state, hostname) {
                //todo: getAvailableTimestamp
                state.selectedWebsite = hostname;
            },

            selectTimestamp(state, timestamp) {
                state.selectedTimestamp = timestamp;
            },
        },
    });

    export default Vue.extend({
        name: 'App',

        components: {
            AppHeader,
            WebsiteContainer,
        },

        store,
    });
</script>


<style lang="scss">
    @import './scss/global';
</style>
