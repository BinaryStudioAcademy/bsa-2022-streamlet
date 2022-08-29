import { AppRoutes, IconColor, IconName } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Icon } from 'components/common/icon';
import { useAppDispatch, useAppSelector, useEffect, useNavigate } from 'hooks/hooks';
import { channelActions, streamActions } from 'store/actions';

import styles from './styles.module.scss';

const StudioHome: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { channel } = useAppSelector((state) => ({
    stream: state.stream.currentStreamData,
    channel: state.channel.myChannel.data,
    streamingKey: state.channel.myChannel.streamingKey,
    channelErrorCode: state.channel.myChannel.errorCode,
    streamErrorCode: state.stream.errorCode,
  }));

  // NOT DONE (?)
  useEffect(() => {
    const fetch = async (): Promise<void> => {
      let loadedChannel;
      if (!channel) {
        loadedChannel = await dispatch(channelActions.loadMyChannel()).unwrap();
      }
      const currentStream = await dispatch(streamActions.getStreamData({ id: loadedChannel?.id ?? 'ERROR' })).unwrap();
      if (currentStream) {
        navigate(`${AppRoutes.STUDIO_STREAM}/${currentStream.id}`, { replace: true });
      }
    };
    fetch();
  }, [dispatch, channel, navigate]);

  return (
    <div className={styles['studio']}>
      <h1 className={styles['header']}>Welcome to Studio!</h1>
      <div className={styles['controls']}>
        <button className={styles['button']}>
          <Icon name={IconName.CAMERA} color={IconColor.WHITE} width="60" height="60" />
          <p>Start streaming</p>
        </button>
      </div>
    </div>
  );
};
export { StudioHome };
