import { UserSignUpRequestDto } from 'common/types/types';

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpRequestDto = {
  email: '',
  username: '',
  password: '',
  passwordConfirm: '',
};

export { DEFAULT_SIGN_UP_PAYLOAD };
