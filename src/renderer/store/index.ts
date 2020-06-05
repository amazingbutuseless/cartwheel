import Vue from 'vue';
import Vuex from 'vuex';

import { WebsiteMetadata } from './website';
import Mutations from './mutations';
import Actions from './actions';

Vue.use(Vuex);

interface CartwheelStates {
    availableWebsites: Array<WebsiteMetadata>,
    selectedWebsite: string,

    availableTimestamps: string[],
    selectedTimestamp: string,
}

export default new Vuex.Store({
  state: {
    availableWebsites: [],
    selectedWebsite: '',

    availableTimestamps: [],
    selectedTimestamp: '',
  },

  getters: {
    registeredWebsites(state: CartwheelStates) {
      return state.availableWebsites.map((website: WebsiteMetadata) => {
        return {
          name: website.title,
          value: website.url,
        };
      });
    },
  },

  mutations: Mutations,

  actions: Actions,
});
