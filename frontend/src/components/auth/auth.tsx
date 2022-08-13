import { AppRoute, DataStatus, errorMessages } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { useAppSelector, useLocation } from 'hooks/hooks';
import { AuthContainer, RestorePasswordForm } from './components/components';

const Auth: FC = () => {
  const status = useAppSelector((state) => state.auth.dataStatus);
  const error = useAppSelector((state) => state.auth.error);
  const { pathname } = useLocation();
  const handleRestorePasswordSubmit = (): void => {
    // handle restore password
  };

  const getScreen = (screen: string, topLevelError: string | undefined): React.ReactElement | null => {
    switch (screen) {
      case AppRoute.RESTORE_PASSWORD: {
        return (
          <AuthContainer
            pageTitle="Restore password"
            className="restore-password"
            children={<RestorePasswordForm onSubmit={handleRestorePasswordSubmit} />}
            topLevelError={topLevelError}
          />
        );
      }
    }

    return null;
  };
  const topLevelErrorMessage = status === DataStatus.REJECTED ? error || errorMessages.DEFAULT : undefined;
  return <>{getScreen(pathname, topLevelErrorMessage)}</>;
};

export { Auth };
