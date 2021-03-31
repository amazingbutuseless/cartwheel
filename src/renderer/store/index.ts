import Vue from 'vue';
import Vuex from 'vuex';

import { WebsiteMetadata } from '../../common/website';

import modal from './modules/modal';
import websites from './modules/websites';
import website from './modules/website';
import screenshots from './modules/screenshots';


Vue.use(Vuex);

interface CartwheelStates {
    availableWebsites: Array<WebsiteMetadata>,
    selectedWebsite: string,

    availableTimestamps: string[],
    selectedTimestamp: string,
}

export default new Vuex.Store({
    state: {
        isLoading: false,
    },

    mutations: {
        switchLoading(state, isLoading) {
            state.isLoading = isLoading;
        }
    },

  modules: {
    modal,
    websites,
    website,
    screenshots,
  }
});
