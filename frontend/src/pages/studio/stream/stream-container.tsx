import { STREAMING_SERVER_URL } from 'common/constants/constants';
import { ENV, IconName, SocketEvents, StreamStatus } from 'common/enums/enums';
import { FC, StreamUpdateRequestDto } from 'common/types/types';
import { createToastNotification } from 'components/common/toast-notification';
import { Forbidden } from 'components/placeholder-page';
import { NotFound } from 'components/placeholder-page/not-found';
import { errorCodes } from 'exceptions/exceptions';
import { useAppDispatch, useAppForm, useAppSelector } from 'hooks/hooks';
import { useCallback, useEffect, useState } from 'react';
import { streamActions } from 'store/actions';
import { StreamInfoFormValues } from './common/stream-info-form-values';
import { StudioStream } from './stream/stream';
import { socket } from 'common/config/config';
import { StreamSettingsModal } from '../common/stream-settings-modal/stream-settings-modal';
import { store } from 'store/store';
import { shallowEqual } from 'react-redux';

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
  const { channel, streamingKey, errorCode } = useAppSelector(
    (state) => ({
      channel: state.stream.channel,
      streamingKey: state.stream.streamingKey,
      errorCode: state.stream.status.errorCode,
    }),
    shallowEqual,
  );

  const streamStatus = useAppSelector((state) => state.stream.stream?.status);
  const streamId = useAppSelector((state) => state.stream.stream?.id);

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const handleSettingsModalOpen = (): void => {
    setIsSettingsModalOpen(true);
  };

  const handleSettingsModalClose = (): void => {
    setIsSettingsModalOpen(false);
  };

  const handleSettingsModalSave = useCallback(
    (payload: StreamUpdateRequestDto) => {
      dispatch(streamActions.editStream(payload));
    },
    [dispatch],
  );

  const handleChangeStreamStatus = useCallback(() => {
    let newStatus;
    if (streamStatus === StreamStatus.WAITING) {
      newStatus = StreamStatus.LIVE;
    }
    if (streamStatus === StreamStatus.LIVE) {
      newStatus = StreamStatus.FINISHED;
    }
    if (!newStatus) {
      return;
    }
    dispatch(
      streamActions.setStreamStatus({
        status: newStatus,
        videoId: streamId ?? '',
      }),
    );
  }, [dispatch, streamStatus, streamId]);

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
  }, [dispatch, channel?.id]);

  const defaultInfoFormValues = useCallback(
    () => ({
      streamingKey: streamingKey ?? '',
      streamingServerUrl: STREAMING_SERVER_URL,
      streamUrl: `${ENV.VIDEO_FALLBACK_BASE_URL}/video/${streamId}`,
    }),
    [streamId, streamingKey],
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
      <StreamSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={handleSettingsModalClose}
        onSave={handleSettingsModalSave}
      />
      <StudioStream
        handleSettingsModalOpen={handleSettingsModalOpen}
        handleChangeStreamStatus={handleChangeStreamStatus}
        handleCopy={handleCopy}
        handleStreamingKeyReset={handleStreamingKeyReset}
        infoFormControl={infoFormControl}
        infoFormErrors={infoFormErrors}
        infoFormValues={infoFormValues}
      />
    </>
  );
};

export { StudioStreamContainer };
