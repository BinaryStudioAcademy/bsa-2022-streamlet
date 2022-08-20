import { UserSignUpRequestDto } from 'common/types/types';

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpRequestDto = {
  email: '',
  username: '',
  password: '',
  password_confirm: '',
};

export { DEFAULT_SIGN_UP_PAYLOAD };
