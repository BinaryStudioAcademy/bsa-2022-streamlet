const UserValidationMessage = {
  EMAIL_REQUIRE: 'Email is required',
  EMAIL_WRONG: 'Email is wrong',
  PASSWORD_REQUIRE: 'Password is required',
  USERNAME_REQUIRE: 'Username is required',
  PASSWORD_RESET_TOKEN_REQUIRE: 'Password reset token is required',
  PASSWORD_RESET_PASSWORD_REQUIRE: 'Please provide a new password',
  ACCOUNT_VERIFICATION_TOKEN_REQUIRE: 'Account verification token is required',
  EMAIL_WRONG_LENGTH: 'Please enter a valid email',
  PASSWORD_WRONG_LENGTH: 'Password should have 8-16 characters',
  PASSWORD_CONFIRM_REQUIRE: 'That is not the same password as the first one',
  PASSWORDS_NOT_MATCH: 'That is not the same password as the first one',
  USERNAME_WRONG_LENGTH: 'Username should have 3-25 characters',
  USERNAME_WRONG_REGEX: 'Username should only contain latin characters, numbers and underscores',
} as const;

export { UserValidationMessage };
