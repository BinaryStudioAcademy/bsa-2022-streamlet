type UserSignUpRequestDto = {
  email: string;
  username: string;
  password: string;
  password_confirm?: string;
};

export { type UserSignUpRequestDto };
