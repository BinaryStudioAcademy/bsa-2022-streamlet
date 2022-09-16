const PREFIX = 'channel-page';

const ActionsTypes = {
  LOAD_CHANNEL: `${PREFIX}/load-channel`,
  UPDATE_CHANNEL_INFO: `${PREFIX}/update-channel-info`,
  UPDATE_CHANNEL_AVATAR: `${PREFIX}/update-channel-avatar`,
  UPDATE_CHANNEL_BANNER: `${PREFIX}/update-channel-banner`,
  LOAD_CHANNEL_SETTINGS: `${PREFIX}/load-my-channel`,
  UNLOAD_CHANNEL_SETTINGS: `${PREFIX}/unload-my-channel`,
  UPDATE_CHANNEL_SUBSCRIPTION_COUNT: `${PREFIX}/update-channel-subs-count`,
};

export { ActionsTypes };
