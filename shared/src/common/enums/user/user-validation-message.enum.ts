const UserValidationMessage = {
  EMAIL_REQUIRE: 'Email is required',
  EMAIL_WRONG: 'Email is wrong',
  PASSWORD_REQUIRE: 'Password is required',
  PASSWORDS_NOT_MATCH: 'Password and Confirm Password must be match',
  PASSWORD_CONFIRM_REQUIRE: 'Confirm password is required',
  USERNAME_REQUIRE: 'Username is required',
} as const;

export { UserValidationMessage };
