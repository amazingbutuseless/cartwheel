import { ipcRenderer } from 'electron';

export default {
    namespaced: true,

    state: {
        id: '',
        groups: [],
        pages: [],
        canTake: true,
    },

    getters: {
        timeline(state): Array<object> {
            state.groups.sort((p, n) => {
                if (p > n) return -1;
                if (n > p) return 1;
                return 0;
            });

            return state.groups.map((timestamp: string) => {
                return {
                    timestamp
                };
            });
        }
    },

    mutations: {
        setId(state, id): void {
            state.id = id;
        },

        setGroups(state, {groups}): void {
            state.groups = groups;
        },

        deleteGroup(state, id): void {
            state.groups.splice(state.groups.indexOf(id), 1);
            state.id = '';
        },

        setPages(state, pages): void {
            state.pages = pages;
        },

        switchAvailable(state, available): void {
            state.canTake = available;
        },

        add(state, timestamp): void {
            state.groups.push(timestamp);
        }
    },

    actions: {
        setGroups({commit, state, rootState}): void {
            const hostname = rootState.website.hostname;
            console.log(`[screenshots/setGroups] Find directories under ${ hostname }`);

            const groups = ipcRenderer.sendSync('screenshots-group-get', hostname);
            console.log(`[screenshots/setGroups] ${ groups.length } directories found.`);
            commit({
                type: 'setGroups', 
                groups
            });
        },

        deleteGroup({commit, state, rootState}): void {
            const param = {
                hostname: rootState.website.hostname,
                id: state.id,
            };

            ipcRenderer.sendSync('screenshots-group-delete', param);

            commit('deleteGroup', param.id);
        },

        setPages({commit, state, rootState}): void {
            const basePath = `${ rootState.website.hostname }/${ state.id }`;
            const sitemap = ipcRenderer.sendSync('screenshots-list', basePath);

            const settings = rootState.websites.list.find(website => website.url.includes(rootState.website.hostname));
            let remoteHostname = '';

            if (settings.remote.length > 0) {
                const parser = document.createElement('a');
                parser.href = settings.remote;
                remoteHostname = parser.hostname;
            }

            let pages = [];

            const diff = (fileName: string, compareTo: string) => {
                const hostname = rootState.website.hostname;
                const id = state.id;

                return ipcRenderer.sendSync('screenshots-diff', {
                    hostname,
                    id,
                    compareTo,
                    fileName
                });
            };

            const getPage = (details, prefix: string = '/') => {
                Object.entries(details).forEach(([key, val]) => {
                    if (typeof val == 'object') {
                        getPage(val, `${ prefix }/${ key }`);
                    }
                });

                if (details.hasOwnProperty('title')) {
                    let data = {
                        'path': `/${ prefix }`,
                        'title': details.title,
                        'screenshot': details.screenshot,
                        'diffFromPrevious': diff(details.screenshot.substr(details.screenshot.lastIndexOf('/') + 1), 'previous'),
                    };

                    if (settings.remote.length > 0) data['diffFromRemote'] = diff(details.screenshot.substr(details.screenshot.lastIndexOf('/') + 1), remoteHostname);

                    pages.push(data);
                }
            };

            Object.entries(sitemap).forEach(([depth, details]) => {
                getPage(details, `${ depth }`);
            });

            pages.sort((prev, next) => {
                if (prev.path < next.path) return -1;
                if (next.path < prev.path) return 1;
            });

            commit('setPages', pages);
        },

        take({commit, state, rootState}, { url, id, viewportWidth, remote }): void {
            const hostname = rootState.website.hostname;

            console.log(`[screenshots/take] Start to take screenshots of ${ hostname } under ${ id }`);

            const payload = {
                url,
                id,
                viewportWidth,
                remote,
            };

            ipcRenderer.send('screenshots-take', payload);
        },
    },
};
