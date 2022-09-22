import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useEffect, useLocation, useNavigate } from 'hooks/hooks';
import { AppRoutes } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { getUserStreamPermission } from 'store/auth/actions';
import { StreamPermission } from 'shared/build';

type Props = {
  element: JSX.Element;
};

const ProtectedRoute: FC<Props> = ({ element }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, streamPermission } = useAppSelector((state) => ({
    user: state.auth.user,
    streamPermission: state.auth.streamPermission,
  }));
  const { pathname } = useLocation();

  const hasUser = Boolean(user);

  useEffect(() => {
    if (hasUser) {
      dispatch(getUserStreamPermission());
    }
  }, [dispatch, hasUser]);

  if (hasUser && pathname.includes('/studio') && streamPermission.streamPermission !== StreamPermission.ALLOWED) {
    navigate(AppRoutes.ROOT, { replace: true });
  }

  return hasUser ? element : <Navigate to={{ pathname: AppRoutes.SIGN_IN }} />;
};

export { ProtectedRoute };
