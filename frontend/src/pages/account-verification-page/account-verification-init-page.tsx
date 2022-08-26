import { FC } from 'common/types/types';
import { AuthContainer } from 'components/auth/components/components';
import { createToastNotification } from 'components/common/common';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SendVerificationLinkForm,
  SendVerificationLinkFormValues,
} from './send-verification-link-form/send-verification-link-form';
import { ContinueWithParagraph } from 'components/auth/components/common/common';
import { AppRoutes } from 'common/enums/enums';
import { authApi } from 'services/services';
import { ErrorBox } from 'components/common/errors/errors';
import { allAuthNotifications, AuthNotification } from 'components/auth/config/config';
import formStyles from 'components/auth/components/form-controls.module.scss';

// a page for initializing verification flow
const AccountVerificationInitPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<false | string>(false);
  const navigate = useNavigate();

  const handleVerificationFormSubmit = async (data: SendVerificationLinkFormValues): Promise<void> => {
    try {
      setError(false);
      setIsLoading(true);
      const response = await authApi.sendAccountVerificationLetter({ email: data.email });
      navigate(AppRoutes.SIGN_IN, { replace: true });
      createToastNotification({
        ...allAuthNotifications[AuthNotification.ACCOUNT_VERIFICATION_LETTER_SENT],
        message: response.message,
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
      <SendVerificationLinkForm onSubmit={handleVerificationFormSubmit} isLoading={isLoading} />
      <ContinueWithParagraph
        linkTitle="Back to Sign In"
        prompt=""
        route={AppRoutes.SIGN_IN}
        className={formStyles['upper-space-regular']}
      />
    </AuthContainer>
  );
};

export { AccountVerificationInitPage };
