import { FC } from 'common/types/types';
import { AuthContainer } from 'components/auth/components/components';
import { Button, Loader, setNotification } from 'components/common/common';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { commonFrontendPaths } from 'shared/build/common/enums/enums';
import {
  SendVerificationLinkForm,
  SendVerificationLinkFormValues,
} from './send-verification-link-form/send-verification-link-form';
import authSumbitBtnStyles from 'components/auth/components/common/auth-submit-btn/styles.module.scss';
import styles from './styles.module.scss';
import { ContonueWithParagraph } from 'components/auth/components/common/common';
import { AppRoutes, IconName, NotificationType } from 'common/enums/enums';
import clsx from 'clsx';
import { authApi } from 'services/services';
import { ErrorBox } from 'components/common/errors/errors';

// this page is for verification link from email
// it assumes user hasn't signed in yet and provides a way to resend link if the token expired
// if you want a page for initializing verification flow (e.g., from profile settings), you can use send-verification-link-form, but not this page
const AccountVerificationConfirmPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<false | string>(false);
  const [showResendForm, setShowResendForm] = useState(false);
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();
  const token = queryParams.get(commonFrontendPaths.auth.ACCOUNT_VERIFICATION_CONFIRM.queryParamNames.token);

  useEffect(() => {
    if (!token) {
      setError('The token in your link has expired or is incorrect. Please, get a new link using the button below');
      return;
    }
    const { cancelRequest, response: responsePromise } = authApi.confirmAccountVerification({
      token: decodeURIComponent(token),
    });
    const confirm = async (): Promise<void> => {
      try {
        setError(false);
        setIsLoading(true);
        // remember that token in url is encoded to base64url
        const response = await responsePromise;
        navigate(AppRoutes.SIGN_IN, { replace: true });
        setNotification({
          type: NotificationType.SUCCESS,
          iconName: IconName.BELL,
          title: 'Account Verification',
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
    confirm();
    return () => cancelRequest();
  }, [token, navigate]);

  const handleVerificationFormSubmit = async (data: SendVerificationLinkFormValues): Promise<void> => {
    try {
      setError(false);
      setIsLoading(true);
      const response = await authApi.sendAccountVerificationLetter({ email: data.email });
      navigate(AppRoutes.SIGN_IN, { replace: true });
      setNotification({
        type: NotificationType.SUCCESS,
        iconName: IconName.BELL,
        title: 'Account Verification',
        message: response.message,
        durationMs: 10_000,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred. Try again, please');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer pageTitle="Account Verification">
      {error && <ErrorBox message={error} />}
      {isLoading && <Loader hCentered spinnerSize="md" />}
      {showResendForm ? (
        <SendVerificationLinkForm onSubmit={handleVerificationFormSubmit} isLoading={isLoading} />
      ) : (
        <Button
          content="Resend verification link?"
          className={clsx(authSumbitBtnStyles['auth-submit-btn'], styles['resend-prompt-btn'])}
          onClick={(): void => {
            setShowResendForm(true);
          }}
          disabled={isLoading}
        />
      )}
      <ContonueWithParagraph linkTitle="Back to Sign In" prompt="" route={AppRoutes.SIGN_IN} />
    </AuthContainer>
  );
};

export { AccountVerificationConfirmPage };
