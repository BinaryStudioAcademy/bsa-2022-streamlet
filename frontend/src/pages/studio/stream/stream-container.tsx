import { STREAMING_SERVER_URL } from 'common/constants/constants';
import { IconName, SocketEvents, StreamStatus } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { createToastNotification } from 'components/common/toast-notification';
import { Forbidden } from 'components/placeholder-page';
import { NotFound } from 'components/placeholder-page/not-found';
import { errorCodes } from 'exceptions/exceptions';
import { useAppDispatch, useAppForm, useAppSelector } from 'hooks/hooks';
import { useCallback, useEffect, useState } from 'react';
import { streamActions } from 'store/actions';
import { StreamInfoFormValues } from './common/stream-info-form-values';
import { StudioStream } from './stream';
import { socket } from 'common/config/config';
import { StreamEditModal } from '../common/stream-edit-modal/stream-edit-modal';
import { store } from 'store/store';

socket.on(SocketEvents.notify.STREAM_OBS_STATUS, (isReadyToStream: boolean) => {
  store.dispatch(
    streamActions.setReadinessToStream({
      videoId: store.getState().stream.stream?.id ?? '',
      isReadyToStream,
    }),
  );
});

const StudioStreamContainer: FC = () => {
  const dispatch = useAppDispatch();
  const { stream, channel, streamingKey, errorCode } = useAppSelector((state) => ({
    stream: state.stream.stream,
    channel: state.stream.channel,
    streamingKey: state.stream.streamingKey,
    errorCode: state.stream.status.errorCode,
  }));

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const handleSettingsModalOpen = (): void => {
    setIsSettingsModalOpen(true);
  };

  const handleSettingsModalClose = (): void => {
    setIsSettingsModalOpen(false);
    // settingsFormReset(defaultSettingsFormValues());
  };

  const handleChangeStreamStatus = useCallback(() => {
    let newStatus;
    if (stream?.status === StreamStatus.WAITING) {
      newStatus = StreamStatus.LIVE;
    }
    if (stream?.status === StreamStatus.LIVE) {
      newStatus = StreamStatus.FINISHED;
    }
    if (!newStatus) {
      return;
    }
    dispatch(
      streamActions.setStreamStatus({
        status: newStatus,
        videoId: stream?.id ?? '',
      }),
    );
  }, [dispatch, stream]);

  const handleCopy = (): void => {
    createToastNotification({
      type: 'success',
      message: 'Copied!',
      iconName: IconName.INFO,
      title: '',
    });
  };

  const handleStreamingKeyReset = useCallback(() => {
    dispatch(streamActions.resetStreamingKey({ channelId: channel?.id ?? '' }));
  }, [dispatch, channel]);

  const defaultInfoFormValues = useCallback(
    () => ({
      streamingKey: streamingKey ?? '',
      streamingServerUrl: STREAMING_SERVER_URL,
      streamUrl: `https://dev.streamlet.tk/video/${stream?.id}`,
    }),
    [stream?.id, streamingKey],
  );

  const {
    control: infoFormControl,
    errors: infoFormErrors,
    getValues: infoFormValues,
    reset: infoFormReset,
  } = useAppForm<StreamInfoFormValues>({
    defaultValues: defaultInfoFormValues(),
  });

  const isNotFound = errorCode === errorCodes.stream.NOT_FOUND || errorCode === errorCodes.stream.NO_CHANNELS;

  const isForbidden = errorCode === errorCodes.stream.FORBIDDEN || errorCode === errorCodes.stream.ACTIVE_STREAM_EXISTS;

  useEffect(() => {
    infoFormReset(defaultInfoFormValues());
  }, [infoFormReset, defaultInfoFormValues]);

  return isNotFound ? (
    <NotFound />
  ) : isForbidden ? (
    <Forbidden />
  ) : (
    <>
      <StreamEditModal isOpen={isSettingsModalOpen} onClose={handleSettingsModalClose} />
      <StudioStream
        handleSettingsModalOpen={handleSettingsModalOpen}
        handleChangeStreamStatus={handleChangeStreamStatus}
        handleCopy={handleCopy}
        handleStreamingKeyReset={handleStreamingKeyReset}
        stream={stream}
        infoFormControl={infoFormControl}
        infoFormErrors={infoFormErrors}
        infoFormValues={infoFormValues}
      />
    </>
  );
};

export { StudioStreamContainer };
