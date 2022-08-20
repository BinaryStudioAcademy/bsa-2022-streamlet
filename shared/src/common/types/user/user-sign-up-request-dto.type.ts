type UserSignUpRequestDto = {
  email: string;
  username: string;
  password: string;
  passwordConfirm?: string;
};

export { type UserSignUpRequestDto };
