import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { AppRoutes } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { getUserStreamPermission } from 'store/auth/actions';

type Props = {
  element: JSX.Element;
};

const ProtectedRoute: FC<Props> = ({ element }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => ({
    user: state.auth.user,
    streamPermission: state.auth.streamPermission,
  }));

  useEffect(() => {
    dispatch(getUserStreamPermission());
  }, [dispatch]);

  const hasUser = Boolean(user);

  return hasUser ? element : <Navigate to={{ pathname: AppRoutes.SIGN_IN }} />;
};

export { ProtectedRoute };
