import { AppRoutes } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Loader } from 'components/common/common';
import { Forbidden } from 'components/placeholder-page';
import { useAppDispatch } from 'hooks/hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { streamActions } from 'store/actions';

import styles from './styles.module.scss';

const StudioNewStream: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isForbidden, setIsForbidden] = useState(false);

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      try {
        await dispatch(streamActions.getStreamingInfo()).unwrap();
        setIsForbidden(true);
      } catch (err) {
        console.warn(err);
        const channel = await dispatch(streamActions.getMyChannel()).unwrap();
        const stream = await dispatch(streamActions.createStream({ channelId: channel.id })).unwrap();
        navigate(`${AppRoutes.STUDIO_STREAM}/${stream.id}`, { replace: true });
      }
    };
    fetch();
  }, [dispatch, navigate]);

  return isForbidden ? (
    <Forbidden />
  ) : (
    <div className={styles['studio']}>
      <Loader />
    </div>
  );
};
export { StudioNewStream };
