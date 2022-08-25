export const exceptionMessages = {
  auth: {
    INCORRECT_CREDENTIALS_LOGIN: 'Wrong email or password. Please, try again',
    TOKEN_NOT_FOUND: 'Token with such value does not exist',
    USER_NOT_FOUND: 'Such user does not exist',
    USER_EMAIL_ALREADY_EXISTS: 'This email is already taken. Please, enter another email or log in',
    USER_USERNAME_ALREADY_EXISTS: 'This name is already taken. Please, enter another name',
    UNAUTHORIZED_NO_TOKEN: 'No bearer token provided',
    UNAUTHORIZED_INCORRECT_TOKEN: 'Incorrect or expired token',
    UNAUTHORIZED_INCORRECT_RESET_PASSWORD_LINK:
      'The token in your link for password reset has expired or was incorrect.',
    UNAUTHORIZED_INCORRECT_ACCOUNT_VERIFICATION_LINK:
      'The token in your link for account verification has expired or was incorrect. Please, get a new one',
    INCORRECT_EMAIL: 'Wrong email. Please, try again',
    EMAIL_NOT_VERIFIED: 'Please, verify your email before logging in',
  },
};
