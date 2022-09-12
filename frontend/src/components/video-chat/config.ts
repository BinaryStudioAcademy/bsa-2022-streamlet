import { ChatMenuOptions, ChatStyle, IconName } from 'common/enums/enums';

const matchMenuOptionWithIconName: Record<ChatMenuOptions, IconName> = {
  [ChatMenuOptions.PARTICIPANTS]: IconName.PARTICIPANTS,
  [ChatMenuOptions.POP_OUT_CHAT]: IconName.OPEN_OUTSIDE,
  [ChatMenuOptions.TOGGLE_TIMESTAMPS]: IconName.TIMESTAMP,
};

const matchMenuOptionWithText: Record<ChatMenuOptions, string> = {
  [ChatMenuOptions.PARTICIPANTS]: 'Participants',
  [ChatMenuOptions.POP_OUT_CHAT]: 'Pop-out chat',
  [ChatMenuOptions.TOGGLE_TIMESTAMPS]: 'Toggle timestamps',
};

const allChatMenuOptions = [
  ChatMenuOptions.PARTICIPANTS,
  ChatMenuOptions.POP_OUT_CHAT,
  ChatMenuOptions.TOGGLE_TIMESTAMPS,
].map((option) => ({
  type: option,
  text: matchMenuOptionWithText[option],
  icon: matchMenuOptionWithIconName[option],
}));

const popOutChatParams = {
  location: 'no',
  toolbar: 'no',
  menubar: 'no',
  width: 600,
  height: 600,
  left: 0,
  top: 0,
};

const popOutChatParamsString = Object.entries(popOutChatParams)
  .map((kv) => kv.join('='))
  .join(',');

const messageMaxLength = 200;

const matchChatStyleWithChatStyleClassName: Record<ChatStyle, string> = {
  [ChatStyle.DEFAULT]: 'chat-default',
  [ChatStyle.GREEN]: 'chat-green',
};

const defaultChatSettings = {
  popOutSetting: true,
  hideSetting: true,
};

export {
  allChatMenuOptions,
  popOutChatParamsString,
  messageMaxLength,
  matchChatStyleWithChatStyleClassName,
  defaultChatSettings,
};
