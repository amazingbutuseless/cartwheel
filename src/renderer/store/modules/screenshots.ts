import { ipcRenderer } from 'electron';

export default {
    namespaced: true,

    state: {
        id: '',
        groups: [],
    },

    getters: {
        timeline(state): Array<object> {
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

        add(state, timestamp): void {
            state.groups.push(timestamp);
        }
    },

    actions: {
        setGroups({commit, state, rootState}): void {
            const groups = ipcRenderer.sendSync('screenshots-group-get', rootState.website.hostname);
            commit({
                type: 'setGroups', 
                groups
            });
        },

        take({commit, state, rootState}, timestamp): void {
            console.log(`start to take screenshots of ${ rootState.website.hostname } under ${ timestamp }`);
            commit({
                type: 'add',
            });
        },
    },
};
