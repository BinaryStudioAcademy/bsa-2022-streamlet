import { FC } from 'common/types/types';
import { VideoChatContainer } from 'components/video-chat/video-chat-container';
import styles from './video-page.module.scss';
import { Icon, Loader } from '../../components/common/common';
import { IconColor, IconName } from '../../common/enums/enums';
import { useAppDispatch, useAppSelector, useEffect } from '../../hooks/hooks';
import { videoActions } from '../../store/actions';
import { VideoBaseResponseDto } from '../../common/types/video/video';

const VideoPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(videoActions.getVideo('90862886-dab4-4777-9b1d-62a0f541559e'));
  }, [dispatch]);
  const videoData: VideoBaseResponseDto | null = useAppSelector((state) => {
    return state.video.video;
  });
  const handleReact = (): void => {
    dispatch(videoActions.videoReact({ videoId: '90862886-dab4-4777-9b1d-62a0f541559e', isLike: true }));
  };

  if (!videoData) {
    return <Loader />;
  }
  return (
    <div className={styles['video-page']}>
      <div className={styles['video-block']} />
      <div className={styles['reaction-container']}>
        <Icon
          onClick={handleReact}
          name={IconName.THUMB_UP}
          color={videoData.userReaction?.isLike ? IconColor.GREEN : IconColor.GRAY}
          height={'20'}
          width={'20'}
          data-is_like={'1'}
        />
        <span>{videoData.likeNum}</span>
      </div>
      <div className={styles['reaction-container']}>
        <Icon name={IconName.THUMB_DOWN} color={IconColor.GRAY} height={'20'} width={'20'} data-is_loke={'0'} />
        <span>{videoData.disLikeNum}</span>
      </div>

      <div className={styles['chat-block']}>
        <VideoChatContainer comments={videoData.comments} />
      </div>
    </div>
  );
};

export { VideoPageContainer };
