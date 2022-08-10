import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Button, Link } from 'components/common/common';

import '../../../../assets/css/auth.scss';

type Props = {
  onSubmit: () => void;
};

const RestorePasswordForm: FC<Props> = () => {
  return (
    <>
      <form className="form-container">
        <label htmlFor="restore-email-input">Email</label>
        <input id="restore-email-input" type="email" placeholder="username@gmail.com" />
        <Button className="auth-submit-btn" type="submit" label="Send" />
      </form>
      <p className="continue-with-paragraph">
        <Link to={AppRoute.SIGN_IN} className="auth-link">
          Back to login
        </Link>
      </p>
    </>
  );
};

export { RestorePasswordForm };
