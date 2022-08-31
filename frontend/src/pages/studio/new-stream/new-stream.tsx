import { AppRoutes, IconName } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { createToastNotification, Loader } from 'components/common/common';
import { Forbidden, NotFound } from 'components/placeholder-page';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { errorCodes } from 'shared/build';
import { streamActions } from 'store/actions';

import styles from './styles.module.scss';

const StudioNewStream: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isForbidden, setIsForbidden] = useState(false);

  const { stream, channel, errorCode } = useAppSelector((state) => ({
    stream: state.stream.stream,
    channel: state.stream.channel,
    errorCode: state.stream.status.errorCode,
  }));

  useEffect(() => {
    dispatch(streamActions.getStreamingInfo());
  }, [dispatch]);

  useEffect(() => {
    if (stream) {
      createToastNotification({
        iconName: IconName.ALARM,
        title: '!',
        message: 'You cannot have more than one active stream!',
        type: 'warning',
      });
      navigate(`${AppRoutes.STUDIO_STREAM}/${stream.id}`, { replace: true });
    } else {
      dispatch(streamActions.createStream({ channelId: channel?.id ?? 'ERROR' }));
    }
  }, [dispatch, stream, navigate, channel]);

  useEffect(() => {
    if (stream) {
      navigate(`${AppRoutes.STUDIO_STREAM}/${stream?.id}`, { replace: true });
    }
  }, [navigate, stream]);

  useEffect(() => {
    if (errorCode === errorCodes.stream.FORBIDDEN || errorCode === errorCodes.stream.ACTIVE_STREAM_EXISTS) {
      setIsForbidden(true);
    }
  }, [errorCode]);

  const isNotFound = errorCode === errorCodes.stream.NOT_FOUND || errorCode === errorCodes.stream.NO_CHANNELS;

  return isNotFound ? (
    <NotFound />
  ) : isForbidden ? (
    <Forbidden />
  ) : (
    <div className={styles['studio']}>
      <Loader spinnerSize="50px" color="white" />
    </div>
  );
};
export { StudioNewStream };
