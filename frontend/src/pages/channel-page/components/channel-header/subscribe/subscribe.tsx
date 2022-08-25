import { AppRoutes } from 'common/enums/enums';
import { Button } from 'components/common/common';
import { useAppSelector } from 'hooks/hooks';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  className?: string;
};

const Subscribe: FC<Props> = ({ className }) => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const handleSubscribeClick = (): void => {
    if (!user) {
      navigate(AppRoutes.SIGN_IN);
      return;
    }
  };
  return <Button content={'Subscribe'} className={className} onClick={handleSubscribeClick} />;
};

export { Subscribe };
