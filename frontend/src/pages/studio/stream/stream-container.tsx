import { STREAMING_SERVER_URL } from 'common/constants/constants';
import { IconName, SocketEvents, StreamStatus } from 'common/enums/enums';
import { FC, StreamPosterUploadRequestDto, StreamUpdateRequestDto } from 'common/types/types';
import { createToastNotification } from 'components/common/toast-notification';
import { Forbidden } from 'components/placeholder-page';
import { NotFound } from 'components/placeholder-page/not-found';
import { errorCodes } from 'exceptions/exceptions';
import { useAppDispatch, useAppForm, useAppSelector } from 'hooks/hooks';
import { useCallback, useEffect, useState } from 'react';
import { streamActions } from 'store/actions';
import { StreamInfoFormValues, StreamSettingsFormValues } from './common/stream-settings-form-values';
import { StudioStream } from './stream';
import { socket } from 'common/config/config';

const StudioStreamContainer: FC = () => {
  const dispatch = useAppDispatch();
  const { stream, channel, streamingKey, errorCode } = useAppSelector((state) => ({
    stream: state.stream.stream,
    channel: state.stream.channel,
    streamingKey: state.stream.streamingKey,
    errorCode: state.stream.status.errorCode,
  }));

  const [isEditingForm, setIsEditingForm] = useState(false);
  const [isObsConnected, setIsObsConnected] = useState(false);

  socket.on(SocketEvents.notify.STREAM_OBS_STATUS, (status: boolean) => {
    setIsObsConnected(status);
  });

  const handleFormEdit = (): void => {
    setIsEditingForm(true);
  };

  const handleFormCancel = (): void => {
    setIsEditingForm(false);
    settingsFormReset(defaultSettingsFormValues());
  };

  const handleFormSave = useCallback(
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

  const handleUploadPoster = useCallback(
    (payload: StreamPosterUploadRequestDto) => {
      dispatch(streamActions.uploadPoster(payload));
    },
    [dispatch],
  );

  const defaultInfoFormValues = useCallback(
    () => ({
      streamingKey: streamingKey ?? '',
      streamingServerUrl: STREAMING_SERVER_URL,
      streamUrl: `https://dev.streamlet.tk/video/${stream?.id}`,
    }),
    [stream?.id, streamingKey],
  );

  const defaultSettingsFormValues = useCallback(
    () => ({
      name: stream?.name,
      tags: stream?.tags.map((tag) => ({ value: tag.id, label: tag.name })),
      categories: stream?.categories.map((category) => ({ value: category.id, label: category.name })),
      description: stream?.description,
      scheduledStreamDate: stream?.scheduledStreamDate ? new Date(stream?.scheduledStreamDate) : new Date(),
      privacy: stream?.privacy,
    }),
    [stream],
  );

  const {
    control: infoFormControl,
    errors: infoFormErrors,
    getValues: infoFormValues,
    reset: infoFormReset,
  } = useAppForm<StreamInfoFormValues>({
    defaultValues: defaultInfoFormValues(),
  });

  const {
    control: settingsFormControl,
    errors: settingsFormErrors,
    reset: settingsFormReset,
    handleSubmit: settingsFormHandleSubmit,
  } = useAppForm<StreamSettingsFormValues>({
    defaultValues: defaultSettingsFormValues(),
  });

  const onSubmit = (submitValue: StreamSettingsFormValues): void => {
    const { name, description, scheduledStreamDate, privacy, tags, categories } = submitValue;
    handleFormSave({
      name,
      description,
      scheduledStreamDate,
      privacy,
      videoId: stream?.id ?? '',
      tags: tags?.map((tag) => ({ name: tag.label })) ?? [],
      categories: categories?.map((category) => ({ name: category.label })) ?? [],
    });
  };

  const isNotFound = errorCode === errorCodes.stream.NOT_FOUND || errorCode === errorCodes.stream.NO_CHANNELS;

  const isForbidden = errorCode === errorCodes.stream.FORBIDDEN || errorCode === errorCodes.stream.ACTIVE_STREAM_EXISTS;

  useEffect(() => {
    infoFormReset(defaultInfoFormValues());
    settingsFormReset(defaultSettingsFormValues());
  }, [infoFormReset, defaultInfoFormValues, defaultSettingsFormValues, settingsFormReset]);

  return isNotFound ? (
    <NotFound />
  ) : isForbidden ? (
    <Forbidden />
  ) : (
    <StudioStream
      handleChangeStreamStatus={handleChangeStreamStatus}
      handleCopy={handleCopy}
      handleFormCancel={handleFormCancel}
      handleFormEdit={handleFormEdit}
      handleFormSave={handleFormSave}
      handleStreamingKeyReset={handleStreamingKeyReset}
      handleUploadPoster={handleUploadPoster}
      isEditingForm={isEditingForm}
      stream={stream}
      infoFormControl={infoFormControl}
      infoFormErrors={infoFormErrors}
      infoFormValues={infoFormValues}
      settingsFormControl={settingsFormControl}
      settingsFormErrors={settingsFormErrors}
      settingsFormHandleSubmit={settingsFormHandleSubmit}
      onSubmit={onSubmit}
      isObsConnected={isObsConnected}
    />
  );
};

export { StudioStreamContainer };
