import { AppRoutes } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { createToastNotification } from 'components/common/common';
import { ErrorBox } from 'components/common/errors/errors';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from 'services/services';
import { AuthContainer, RestorePasswordForm } from './components/components';
import { RestorePasswordFormValues } from './components/restore-password-form/restore-password-form';
import { allAuthNotifications, AuthNotification } from './config/config';

const RestorePasswordPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<undefined | string>(undefined);
  const navigate = useNavigate();

  const handleRestorePasswordSubmit = (data: RestorePasswordFormValues): void => {
    const restore = async (): Promise<void> => {
      try {
        setError(undefined);
        setIsLoading(true);
        // remember that token in url is encoded to base64url
        const response = await authApi.sendPasswordResetLetter({ email: data.email });
        navigate(AppRoutes.SIGN_IN, { replace: true });
        createToastNotification({
          ...allAuthNotifications[AuthNotification.PASSWORD_RESET_LETTER_SENT_SUCCESS],
          message: response.message,
        });
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : 'Unknown error occurred. Refresh the page, or get a new verification link',
        );
      } finally {
        setIsLoading(false);
      }
    };
    restore();
  };

  return (
    <AuthContainer
      pageTitle="Restore password"
      children={<RestorePasswordForm onSubmit={handleRestorePasswordSubmit} isLoading={isLoading} />}
      topLevelErrorComponent={error && <ErrorBox message={error} />}
    />
  );
};

export { RestorePasswordPage };
