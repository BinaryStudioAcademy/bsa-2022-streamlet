import { AppRoutes } from 'common/enums/enums';
import { errorCodes } from 'exceptions/exceptions';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import formStyles from '../form-controls.module.scss';

type Props = {
  message: string;
  errorCode?: string;
};
const ErrorDisplayWithCode: FC<Props> = ({ message, errorCode }) => {
  return (
    <>
      {message}
      {errorCode === errorCodes.auth.signIn.UNVERIFIED && (
        <>
          <br />
          <Link to={AppRoutes.ACCOUNT_VERIFICATION_INIT} className={formStyles['link']}>
            Receive the letter again?
          </Link>
        </>
      )}
    </>
  );
};

export { ErrorDisplayWithCode };
