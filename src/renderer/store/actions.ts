import { WebsiteMetadata } from './website';

export default {
  setAvailableWebsites(context) {
    let websites: Array<WebsiteMetadata> = [
      {
        title: '[ORC] local',
        url: 'https://local.oxfordreadingclub.com',
        remote: 'https://stage.oxfordreadingclub.com',
      },
      {
        title: '[ORC] stage',
        url: 'https://stage.oxfordreadingclub.com',
        remote: 'https://www.oxfordreadingclub.com',
      },
    ];

    context.commit('setAvailableWebsites', websites);
  },

  setAvailableTimestamps(context, payload) {
    let timestamps: string[] = ["1591361622000", "1591365622000"];
    context.commit('setAvailableTimestamps', timestamps);
    console.log(`find the directory under ${ payload.selectedWebsite }`);
  },

  takeScreenshots({ commit, state }) {
      console.log(`start to take screenshots of ${ state.selectedWebsite }`);
  },
};
