import { DataStatus, IconName } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { createToastNotification, Loader, NeedRequestModal } from 'components/common/common';
import { Forbidden, NotFound } from 'components/placeholder-page';
import { useAppDispatch, useAppSelector, useCallback, useEffect, useState } from 'hooks/hooks';
import { errorCodes } from 'shared/build';
import { streamActions } from 'store/actions';
import { StudioStreamContainer } from '../stream/stream-container';
import { StudioHome } from './home';

import styles from './styles.module.scss';

const StudioHomeContainer: FC = () => {
  const dispatch = useAppDispatch();
  const [isUserAuthToStream, setIsUserAuthToStream] = useState(false);

  const { channel, stream, errorCode, error, status } = useAppSelector((state) => ({
    stream: state.stream.stream,
    channel: state.stream.channel,
    status: state.stream.status.dataStatus,
    errorCode: state.stream.status.errorCode,
    error: state.stream.status.error,
  }));

  const handleStartStreaming = useCallback(() => {
    if (isUserAuthToStream) {
      dispatch(streamActions.createStream({ channelId: channel?.id ?? 'ERROR' }));
    }
  }, [dispatch, channel?.id, isUserAuthToStream]);

  useEffect(() => {
    if (error) {
      createToastNotification({
        iconName: IconName.WARNING,
        type: 'danger',
        title: 'Error!',
        message: error,
      });
    }
  }, [error]);

  useEffect(() => {
    dispatch(streamActions.getStreamingInfo());
  }, [dispatch]);

  const isNotFound = errorCode === errorCodes.stream.NOT_FOUND || errorCode === errorCodes.stream.NO_CHANNELS;

  const isForbidden = errorCode === errorCodes.stream.FORBIDDEN || errorCode === errorCodes.stream.ACTIVE_STREAM_EXISTS;

  return !isUserAuthToStream ? (
    <NeedRequestModal
      headerText={'Would you like to start streaming?'}
      className={styles['request-modal']}
      mainText={'Send us request in order to start streaming.'}
      onClose={(): void => {
        setIsUserAuthToStream(false);
      }}
    />
  ) : isForbidden ? (
    <Forbidden />
  ) : isNotFound ? (
    <NotFound />
  ) : status === DataStatus.PENDING ? (
    <Loader spinnerSize="50px" color="white" />
  ) : stream ? (
    <StudioStreamContainer />
  ) : (
    <StudioHome handleStartStreaming={handleStartStreaming} />
  );
};
export { StudioHomeContainer };
