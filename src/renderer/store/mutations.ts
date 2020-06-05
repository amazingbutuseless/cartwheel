import { WebsiteMetadata } from './website';

export default {
  setAvailableWebsites(state: object, websites: Array<WebsiteMetadata>) {
    state.availableWebsites = websites;
  },

  selectWebsite(state: object, hostname: string): void {
    //todo: getAvailableTimestamp
    state.selectedWebsite = hostname;
  },

  setAvailableTimestamps(state: object, timestamps: string[]) {
    state.availableTimestamps = timestamps;
  },

  selectTimestamp(state: object, timestamp: string): void {
    state.selectedTimestamp = timestamp;
  },
};
