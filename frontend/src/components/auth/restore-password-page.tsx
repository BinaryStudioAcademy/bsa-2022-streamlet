import { FC } from 'common/types/types';
import { AuthContainer, RestorePasswordForm } from './components/components';

const RestorePasswordPage: FC = () => {
  const handleRestorePasswordSubmit = (): void => {
    // handle restore password
  };

  return (
    <AuthContainer
      pageTitle="Restore password"
      className="restore-password"
      children={<RestorePasswordForm onSubmit={handleRestorePasswordSubmit} />}
    />
  );
};

export { RestorePasswordPage };
