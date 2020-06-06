<template>
<div>
    <app-header />
    <website-tools />
    <website-container />
</div>
</template>  


<script lang="ts">
import { ipcRenderer, IpcRendererEvent } from 'electron';

import Vue from 'vue';

import store from './store/index';

import AppHeader from './components/AppHeader.vue';
import WebsiteTools from './components/WebsiteTools.vue';
import WebsiteContainer from './components/WebsiteContainer.vue';
import { WebsiteMetadata } from '../common/website';

export default Vue.extend({
    name: 'App',
    
    store,

    components: {
        AppHeader,
        WebsiteTools,
        WebsiteContainer,
    },

    methods: {
    },

    created() {
        const onGettingWebsitesReplied = (e: IpcRendererEvent, websites: Array<WebsiteMetadata>): void => {
            this.$store.commit('websites/setList', websites);
        };

        const onAddingWebstiteReplied = (e: IpcRendererEvent, website: WebsiteMetadata): void => {
            console.trace();
            this.$store.commit('websites/addItem', website);
        };

        const onUpdatingWebstiteReplied = (e: IpcRendererEvent, website: WebsiteMetadata) => {
            this.$store.commit('websites/updateItem', website);
        };

        const onDeletingWebstiteReplied = (e: IpcRendererEvent, website: WebsiteMetadata) => {
            this.$store.commit('websites/removeItem', website);
        };

        ipcRenderer.on('websites-get-reply', onGettingWebsitesReplied.bind(this));
        
        ipcRenderer.on('website-add-reply', onAddingWebstiteReplied.bind(this));
        ipcRenderer.on('website-update-reply', onUpdatingWebstiteReplied.bind(this));
        ipcRenderer.on('website-remove-reply', onDeletingWebstiteReplied.bind(this));

        this.$store.dispatch('websites/set');
    },
});

</script>


<style lang="scss">
@import './scss/global';
</style>
