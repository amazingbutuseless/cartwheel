import { ipcRenderer } from 'electron';
import { WebsiteMetadata } from "../../../common/website";

export default {
    namespaced: true,

    state: {
        hostname: '',

        data: {
            title: '',
            url: 'https://',
            remote: '',
        },
    },

    mutations: {
        setHostname(state, hostname: string): void {
            state.hostname = hostname;
        },

        setData(state, website: WebsiteMetadata): void {
            state.data = website;
        },
    },

    actions: {
        add({commit, state}, website: WebsiteMetadata) {
            ipcRenderer.send('website-add', website);
        },
          
        update({commit, state, rootState}, website: WebsiteMetadata) {
            ipcRenderer.send('website-update', website);
        },
        
        remove({commit, state}, website: WebsiteMetadata) {
            ipcRenderer.send('website-remove', website);
        }
    }
};
