import { ipcRenderer } from 'electron';

import Vue from 'vue';
import { WebsiteMetadata } from '../../../common/website';

export default {
    namespaced: true,

    state: {
      list: [],
    },

    getters: {
      options(state) {
        return state.list.map((website: WebsiteMetadata) => {
          return {
            name: website.title,
            value: website.url,
          };
        });
      }
    },
  
    mutations: {
      setList(state, websites: Array<WebsiteMetadata>): void {
        state.list = websites;
      },
  
      addItem(state, website: WebsiteMetadata): void {
        state.list.push(website);
      },

      updateItem(state, website: WebsiteMetadata): void {
        const targetIdx = state.list.findIndex(item => item.url === website.url);
        Vue.set(state.list, targetIdx, website);
      },
      
      removeItem(state, website: WebsiteMetadata): void {
        const targetIdx = state.list.findIndex(item => item.url === website.url);
        state.list.splice(targetIdx, 1);
      },
    },
  
    actions: {
      set({commit, state}): void {
        ipcRenderer.send('websites-get');
      },
    },
  };
