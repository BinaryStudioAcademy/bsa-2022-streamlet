import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/hooks';
import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';

type Props = {
  element: JSX.Element;
};

const ProtectedRoute: FC<Props> = ({ element }) => {
  const { user } = useAppSelector((state) => ({
    user: state.auth.user,
  }));

  const hasUser = Boolean(user);

  return hasUser ? element : <Navigate to={{ pathname: AppRoute.SIGN_IN }} />;
};

export { ProtectedRoute };
