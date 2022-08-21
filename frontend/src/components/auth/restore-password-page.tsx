import { AppRoutes, IconName, NotificationType } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { setNotification } from 'components/common/notifications';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from 'services/services';
import { AuthContainer, RestorePasswordForm } from './components/components';
import { RestorePasswordFormValues } from './components/restore-password-form/restore-password-form';

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
        setNotification({
          type: NotificationType.SUCCESS,
          iconName: IconName.BELL,
          title: 'Password reset',
          message: response.message,
          durationMs: 10_000,
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
      topLevelError={error}
    />
  );
};

export { RestorePasswordPage };
