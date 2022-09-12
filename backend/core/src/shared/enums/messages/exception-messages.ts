export const exceptionMessages = {
  auth: {
    INCORRECT_CREDENTIALS_LOGIN: 'Wrong email or password. Please try again',
    TOKEN_NOT_FOUND: 'Token with such value does not exist',
    USER_NOT_FOUND: 'Such user does not exist',
    USER_EMAIL_ALREADY_EXISTS: 'This email is already taken. Please enter another email or log in',
    USER_USERNAME_ALREADY_EXISTS: 'This name is already taken. Please enter another name',
    UNAUTHORIZED_NO_TOKEN: 'No bearer token provided',
    UNAUTHORIZED_INCORRECT_TOKEN: 'Incorrect or expired token',
    UNAUTHORIZED_INCORRECT_RESET_PASSWORD_LINK:
      'The token in your link for password reset has expired or was incorrect.',
    UNAUTHORIZED_INCORRECT_ACCOUNT_VERIFICATION_LINK:
      'The token in your link for account verification has expired or was incorrect. Please get a new one',
    INCORRECT_EMAIL: 'Wrong email. Please try again',
    EMAIL_NOT_VERIFIED: 'Please verify your email before logging in',
  },
  channelCrud: {
    NO_CHANNELS: 'You dont have any channels',
    CHANNEL_NOT_FOUND: 'Channel with such id wasnt found',
    FORBIDDEN: 'You are trying to do a forbidden channel action',
    ACTIVE_STREAM_EXISTS: 'You cant start a new stream while having another active one',
  },
  chat: {
    CHAT_ID_NOT_FOUND: 'Chat to the video with such id wasn`t found',
    CHAT_IS_DISABLED: 'Chat is disabled',
    CHAT_MESSAGE_NOT_FOUND: 'Chat message with such id wasn`t found',
    CHAT_MESSAGE_IS_EMPTY: 'Chat message is empty',
  },
  video: {
    VIDEO_ID_NOT_FOUND: 'Video with such id was not found',
  },
  comment: {
    COMMENT_NOT_FOUND: 'Comment with such id wasn`t found',
    COMMENT_IS_EMPTY: 'Comment is empty',
    COMMENT_FORBIDDEN: 'Comment with such id isn`t yours',
  },
};
