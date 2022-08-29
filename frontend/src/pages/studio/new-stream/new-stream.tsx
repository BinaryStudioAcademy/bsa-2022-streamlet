import { AppRoutes } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Loader } from 'components/common/common';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { channelActions, streamActions } from 'store/actions';

import styles from './styles.module.scss';

const StudioNewStream: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { stream, channel } = useAppSelector((state) => ({
    stream: state.stream.currentStreamData,
    channel: state.channel.myChannel.data,
    streamingKey: state.channel.myChannel.streamingKey,
    channelErrorCode: state.channel.myChannel.errorCode,
    streamErrorCode: state.stream.errorCode,
  }));

  // NOT DONE
  useEffect(() => {
    const fetch = async (): Promise<void> => {
      let loadedChannel;
      if (!channel) {
        loadedChannel = await dispatch(channelActions.loadMyChannel()).unwrap();
      }
      if (stream) {
        navigate(`${AppRoutes.STUDIO_STREAM}/${stream.id}`);
      }
      const currentStream = await dispatch(streamActions.getStreamData({ id: loadedChannel?.id ?? '' })).unwrap();
      if (currentStream) {
        navigate(`${AppRoutes.STUDIO_STREAM}/${currentStream.id}`, { replace: true });
      }
      await dispatch(streamActions.createStream({ channelId: loadedChannel?.id ?? '' })).unwrap();
    };
    fetch();
  }, [dispatch, channel, navigate, stream]);

  return (
    <div className={styles['studio']}>
      <Loader />
    </div>
  );
};
export { StudioNewStream };
