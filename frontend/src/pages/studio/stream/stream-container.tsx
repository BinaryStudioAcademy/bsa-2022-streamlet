import { SocketEvents, StreamStatus } from 'common/enums/enums';
import { FC, StreamUpdateRequestDto } from 'common/types/types';
import { Forbidden } from 'components/placeholder-page';
import { NotFound } from 'components/placeholder-page/not-found';
import { errorCodes } from 'exceptions/exceptions';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useCallback, useState } from 'react';
import { streamActions } from 'store/actions';
import { StudioStream } from './stream/stream';
import { socket } from 'common/config/config';
import { StreamSettingsModal } from '../common/stream-settings-modal/stream-settings-modal';
import { store } from 'store/store';

socket.on(SocketEvents.notify.STREAM_OBS_STATUS, async (isReadyToStream: boolean) => {
  await store.dispatch(
    streamActions.setReadinessToStream({
      videoId: store.getState().stream.stream?.id ?? '',
      isReadyToStream,
    }),
  );
  await store.dispatch(
    streamActions.setStreamStatus({
      status: isReadyToStream ? StreamStatus.LIVE : StreamStatus.FINISHED,
      videoId: store.getState().stream.stream?.id ?? '',
    }),
  );
});

const StudioStreamContainer: FC = () => {
  const dispatch = useAppDispatch();
  const errorCode = useAppSelector((state) => state.stream.status.errorCode);

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

  const isNotFound = errorCode === errorCodes.stream.NOT_FOUND || errorCode === errorCodes.stream.NO_CHANNELS;

  const isForbidden = errorCode === errorCodes.stream.FORBIDDEN || errorCode === errorCodes.stream.ACTIVE_STREAM_EXISTS;

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
      />
    </>
  );
};

export { StudioStreamContainer };
