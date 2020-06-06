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
            console.log(`find the directory under ${ rootState.website.hostname }`);

            const groups = ["1591361622000", "1591365622000"];
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
