import { FC, UserBaseResponseDto } from 'common/types/types';
import React from 'react';
import { historyActions } from 'store/actions';
import { useAppDispatch, useAppSelector, useEffect, useNavigate } from 'hooks/hooks';
import { AppRoutes } from '../../common/enums/enums';
const HistoryPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user: UserBaseResponseDto | null = useAppSelector((state) => {
    return state.auth.user;
  });

  useEffect(() => {
    if (!user) {
      navigate(`${AppRoutes.SIGN_IN}`, { replace: true });
      return;
    }
    dispatch(historyActions.getUserHistory(null));
  }, [user, dispatch, navigate]);

  return <></>;
};

export { HistoryPage };
