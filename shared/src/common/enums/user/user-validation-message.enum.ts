const UserValidationMessage = {
  EMAIL_REQUIRE: 'Email is required',
  EMAIL_WRONG: 'Wrong email format',
  PASSWORD_REQUIRE: 'Password is required',
  USERNAME_REQUIRE: 'Username is required',
  PASSWORD_RESET_TOKEN_REQUIRE: 'Password reset token is required',
  PASSWORD_RESET_PASSWORD_REQUIRE: 'Please provide a new password',
  ACCOUNT_VERIFICATION_TOKEN_REQUIRE: 'Verification token is required',
  EMAIL_WRONG_LENGTH: 'Please enter a valid email',
  EMAIL_WRONG_REGEX: 'Cyrillic is not allowed',
  PASSWORD_WRONG_LENGTH: 'Password should have 8-16 characters',
  PASSWORD_WRONG_REGEX: 'Password cannot have non-latin characters',
  PASSWORD_CONFIRM_REQUIRE: 'The passwords do not match',
  PASSWORDS_NOT_MATCH: 'The passwords do not match',
  USERNAME_WRONG_LENGTH: 'Username should have 3-25 characters',
  USERNAME_WRONG_REGEX: 'Username cannot have non-latin characters',
} as const;

export { UserValidationMessage };
