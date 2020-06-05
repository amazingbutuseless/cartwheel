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

  setScreenshotGroups(context, hostname: string) {
    let timestamps: string[] = [];
    context.commit('setAvailableTimestamps', timestamps);
  },
};
