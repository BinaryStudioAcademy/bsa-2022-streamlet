import { STREAMING_SERVER_URL } from 'common/constants/constants';
import { ENV, IconName, SocketEvents, StreamPrivacy, StreamStatus } from 'common/enums/enums';
import { FC, SelectOptions, StreamUpdateRequestDto } from 'common/types/types';
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
import { StreamSettingsModal } from '../common/stream-settings-modal/stream-settings-modal';
import { store } from 'store/store';
import { MultiValue, SingleValue } from 'react-select';

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
  };

  const handleSettingsModalSave = useCallback(
    (payload: StreamUpdateRequestDto) => {
      dispatch(streamActions.editStream(payload));
    },
    [dispatch],
  );

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
  }, [dispatch, stream?.status, stream?.id]);

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
      streamUrl: `https://${ENV.SERVER_HOST}${ENV.SERVER_PORT && `:${ENV.SERVER_PORT}`}/video/${stream?.id}`,
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

  const onStreamPrivacyChange = (newValue: MultiValue<SelectOptions>): void => {
    dispatch(
      streamActions.editStream({
        privacy: (newValue as unknown as SingleValue<SelectOptions>)?.value as StreamPrivacy,
      }),
    );
  };

  const onStreamChatToggleChange = (): void => {
    dispatch(
      streamActions.editStream({
        isChatEnabled: !stream?.isChatEnabled,
      }),
    );
  };

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
        stream={stream}
        infoFormControl={infoFormControl}
        infoFormErrors={infoFormErrors}
        infoFormValues={infoFormValues}
        onStreamPrivacyChange={onStreamPrivacyChange}
        onStreamChatToggleChange={onStreamChatToggleChange}
      />
    </>
  );
};

export { StudioStreamContainer };
