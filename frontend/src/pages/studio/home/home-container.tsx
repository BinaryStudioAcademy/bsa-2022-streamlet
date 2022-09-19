import { DataStatus, IconName } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { createToastNotification, Loader } from 'components/common/common';
import { Forbidden, NotFound } from 'components/placeholder-page';
import { useAppDispatch, useAppSelector, useCallback, useEffect } from 'hooks/hooks';
import { errorCodes } from 'shared/build';
import { streamActions } from 'store/actions';
import { StudioStreamContainer } from '../stream/stream-container';
import { StudioHome } from './home';

const StudioHomeContainer: FC = () => {
  const dispatch = useAppDispatch();
  const { channel, stream, errorCode, error, status } = useAppSelector((state) => ({
    stream: state.stream.stream,
    channel: state.stream.channel,
    status: state.stream.status.dataStatus,
    errorCode: state.stream.status.errorCode,
    error: state.stream.status.error,
  }));

  const handleStartStreaming = useCallback(() => {
    dispatch(streamActions.createStream({ channelId: channel?.id ?? 'ERROR' }));
  }, [dispatch, channel?.id]);

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

  return isForbidden ? (
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
