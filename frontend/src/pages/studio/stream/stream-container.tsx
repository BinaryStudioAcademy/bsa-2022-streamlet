import { STREAMING_SERVER_URL } from 'common/constants/constants';
import { IconName, StreamStatus } from 'common/enums/enums';
import { FC, StreamPosterUploadRequestDto, StreamUpdateRequestDto } from 'common/types/types';
import { createToastNotification } from 'components/common/toast-notification';
import { NotFound } from 'components/not-found-page/not-found';
import { errorCodes } from 'exceptions/exceptions';
import { useAppDispatch, useAppForm, useAppSelector } from 'hooks/hooks';
import { useCallback, useEffect, useState } from 'react';
import { channelActions, streamActions } from 'store/actions';
import { StreamInfoFormValues, StreamSettingsFormValues } from './common/stream-settings-form-values';
import { StudioStream } from './stream';
import { SerializedHttpError } from 'helpers/helpers';

const StudioStreamContainer: FC = () => {
  const dispatch = useAppDispatch();
  const { stream, channel, streamingKey } = useAppSelector((state) => ({
    stream: state.stream.currentStreamData,
    channel: state.channel.myChannel.data,
    streamingKey: state.channel.myChannel.streamingKey,
  }));

  const [isEditingForm, setIsEditingForm] = useState(false);
  const [isAccessError, setIsAccessError] = useState(false);

  const handleFormEdit = (): void => {
    setIsEditingForm(true);
  };

  const handleFormCancel = (): void => {
    setIsEditingForm(false);
    settingsFormReset(defaultSettingsFormValues);
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
    dispatch(channelActions.resetStreamingKey({ channelId: channel?.id ?? '' }));
  }, [dispatch, channel]);

  const handleUploadPoster = useCallback(
    (payload: StreamPosterUploadRequestDto) => {
      dispatch(streamActions.uploadPoster(payload));
    },
    [dispatch],
  );

  const defaultSettingsFormValues = {
    name: stream?.name,
    tags: stream?.tags.map((tag) => ({ value: tag.id, label: tag.name })),
    categories: stream?.categories.map((category) => ({ value: category.id, label: category.name })),
    description: stream?.description,
    scheduledStreamDate: stream?.scheduledStreamDate ? new Date(stream?.scheduledStreamDate) : new Date(),
    privacy: stream?.privacy,
  };

  const defaultInfoFormValues = {
    streamingKey: streamingKey ?? '',
    streamingServerUrl: STREAMING_SERVER_URL,
    streamUrl: `https://dev.streamlet.tk/video/${stream?.id}`,
  };

  const {
    control: infoFormControl,
    errors: infoFormErrors,
    getValues: infoFormValues,
  } = useAppForm<StreamInfoFormValues>({
    defaultValues: defaultInfoFormValues,
  });

  const {
    control: settingsFormControl,
    errors: settingsFormErrors,
    reset: settingsFormReset,
    handleSubmit: settingsFormHandleSubmit,
  } = useAppForm<StreamSettingsFormValues>({
    defaultValues: defaultSettingsFormValues,
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

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      try {
        if (!channel) {
          await dispatch(channelActions.loadMyChannel()).unwrap();
        }
        await dispatch(channelActions.getStreamingKey({ id: channel?.id ?? '' })).unwrap();
        await dispatch(streamActions.createStream({ channelId: channel?.id ?? '' })).unwrap();
      } catch (err) {
        if ((err as SerializedHttpError).errorCode === errorCodes.stream.NO_CHANNELS) {
          setIsAccessError(true);
          console.error(404);
        }
        console.error(err as SerializedHttpError);
      }
    };
    fetch();
  }, [channel, dispatch]);

  return isAccessError ? (
    <NotFound />
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
    />
  );
};

export { StudioStreamContainer };
