import { FC } from 'common/types/types';
import { AuthContainer } from 'components/auth/components/components';
import { useSearchParams } from 'react-router-dom';
import { commonFrontendPaths } from 'shared/build/common/enums/enums';

const AccountVerificationPage: FC = () => {
  const [queryParams] = useSearchParams();
  const token = queryParams.get(commonFrontendPaths.auth.ACCOUNT_VERIFICATION_CONFIRM.queryParamNames.token);
  return (
    <AuthContainer pageTitle="Account Verification">
      <h1>Account Verification</h1>
      {token ? 'Good!' : 'Your verification link is incorrect. Please, get a new one'}
    </AuthContainer>
  );
};

export { AccountVerificationPage };
