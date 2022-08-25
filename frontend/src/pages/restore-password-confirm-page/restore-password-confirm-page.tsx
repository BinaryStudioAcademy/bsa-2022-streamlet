import { FC } from 'common/types/types';
import { AuthContainer } from 'components/auth/components/components';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { commonFrontendPaths } from 'shared/build/common/enums/enums';
import { ContinueWithParagraph } from 'components/auth/components/common/common';
import { AppRoutes } from 'common/enums/enums';
import { authApi } from 'services/services';
import { ErrorBox } from 'components/common/errors/errors';
import { HttpError } from 'exceptions/exceptions';
import {
  SelectNewPasswordForm,
  SelectNewPasswordFormValues,
} from './select-new-password-form/select-new-password-form';
import { allAuthNotifications, AuthNotification } from 'components/auth/config/config';
import { createToastNotification } from 'components/common/common';
import { ErrorDisplayWithCode } from 'components/auth/components/error-display-with-code/error-display-with-code';

// this page is for verification link from email
// it assumes user hasn't signed in yet and provides a way to resend link if the token expired
// if you want a page for initializing verification flow (e.g., from profile settings), you can use send-verification-link-form, but not this page
const RestorePasswordConfirmPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<false | string>(false);
  const [errorCode, setErrorCode] = useState<undefined | string>(undefined);
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();
  const token = queryParams.get(commonFrontendPaths.auth.RESET_PASSWORD_CONFIRM.queryParamNames.token);
  useEffect(() => {
    if (!token) {
      setError('The token in your link has expired or is incorrect. Please, get a new link on Sign In page');
    }
  }, [token]);

  const handleFormSubmit = async (data: SelectNewPasswordFormValues): Promise<void> => {
    try {
      if (!token) {
        return;
      }
      setError(false);
      setIsLoading(true);
      // remember that token in url is encoded to base64url
      await authApi.confirmPasswordReset({
        password: data.password,
        token: decodeURIComponent(token),
      });
      navigate(AppRoutes.SIGN_IN, { replace: true });
      createToastNotification(allAuthNotifications[AuthNotification.PASSWORD_RESET_SUCCESS]);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Unknown error occurred. Refresh the page, or get a new verification link',
      );
      if (err instanceof HttpError) {
        setErrorCode(err.errorCode);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer pageTitle="Restore password">
      {error && <ErrorBox message={<ErrorDisplayWithCode message={error} errorCode={errorCode} />} />}
      {token && <SelectNewPasswordForm onSubmit={handleFormSubmit} isLoading={isLoading} />}
      <ContinueWithParagraph linkTitle="Back to Sign In" prompt="" route={AppRoutes.SIGN_IN} />
    </AuthContainer>
  );
};

export { RestorePasswordConfirmPage };
