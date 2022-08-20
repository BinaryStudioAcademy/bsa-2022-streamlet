const UserValidationMessage = {
  EMAIL_REQUIRE: 'Email is required',
  EMAIL_WRONG: 'Email is wrong',
  PASSWORD_REQUIRE: 'Password is required',
  USERNAME_REQUIRE: 'Username is required',
  PASSWORD_RESET_TOKEN_REQUIRE: 'Password reset token is required',
  PASSWORD_RESET_PASSWORD_REQUIRE: 'Please provide a new password',
  ACCOUNT_VERIFICATION_TOKEN_REQUIRE: 'Account verification token is required',
} as const;

export { UserValidationMessage };
