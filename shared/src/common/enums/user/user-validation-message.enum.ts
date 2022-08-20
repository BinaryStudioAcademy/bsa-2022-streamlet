const UserValidationMessage = {
  EMAIL_REQUIRE: 'Please enter a valid email',
  EMAIL_WRONG: 'Please enter a valid email',
  PASSWORD_REQUIRE: 'Password should have 8-16 characters',
  PASSWORD_WRONG: 'Password should have 8-16 characters',
  PASSWORDS_NOT_MATCH: 'That is not the same password as the first one',
  USERNAME_REQUIRE: 'Username should have 3-25 characters',
} as const;

export { UserValidationMessage };
