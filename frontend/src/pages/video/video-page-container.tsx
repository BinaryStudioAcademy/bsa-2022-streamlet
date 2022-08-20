import { FC, UserBaseResponseDto } from 'common/types/types';
import { VideoChatContainer } from 'components/video-chat/video-chat-container';
import styles from './video-page.module.scss';
import { Button, Icon, Loader } from '../../components/common/common';
import { AppRoute, IconColor, IconName } from '../../common/enums/enums';
import { useAppDispatch, useAppSelector, useEffect, useNavigate } from '../../hooks/hooks';
import { videoActions } from '../../store/actions';
import { VideoBaseResponseDto } from '../../common/types/video/video';

const VideoPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(videoActions.getVideo('90862886-dab4-4777-9b1d-62a0f541559e'));
  }, [dispatch]);
  const videoData: VideoBaseResponseDto | null = useAppSelector((state) => {
    return state.video.video;
  });
  const user: UserBaseResponseDto | null = useAppSelector((state) => {
    return state.auth.user;
  });
  const handleLikeReact = (): void => {
    if (!user) {
      navigate(AppRoute.SIGN_IN, { replace: true });
      return;
    }
    dispatch(videoActions.videoReact({ videoId: '90862886-dab4-4777-9b1d-62a0f541559e', isLike: true }));
  };

  const handleDisLikeReact = (): void => {
    if (!user) {
      navigate(AppRoute.SIGN_IN, { replace: true });
      return;
    }
    dispatch(videoActions.videoReact({ videoId: '90862886-dab4-4777-9b1d-62a0f541559e', isLike: false }));
  };

  const handleSubscribe = (): void => {
    if (!user) {
      navigate(AppRoute.SIGN_IN, { replace: true });
      return;
    }
    if (!videoData) {
      return;
    }
    dispatch(videoActions.videoChannelSubscribe(videoData.channelId));
  };
  if (!videoData) {
    return <Loader />;
  }
  return (
    <div className={styles['video-page']}>
      <div className={styles['video-info-block']}>
        <div className={styles['video-block']} />
        <div className={styles['video-header']}>
          <h2 className={styles['video-block-header']}>{videoData.name}</h2>
          <div className={styles['reaction-block']}>
            <div className={styles['reaction-container']}>
              <Icon
                onClick={handleLikeReact}
                name={IconName.THUMB_UP}
                color={videoData.userReaction?.isLike ? IconColor.GREEN : IconColor.GRAY}
                height={'25'}
                width={'25'}
              />
              <span>{videoData.likeNum}</span>
            </div>
            <div className={styles['reaction-container']}>
              <Icon
                onClick={handleDisLikeReact}
                name={IconName.THUMB_DOWN}
                color={IconColor.GRAY}
                height={'25'}
                width={'25'}
              />
              <span>{videoData.disLikeNum}</span>
            </div>
          </div>
        </div>
        <>
          <div className={styles['views-container']}>
            <span>{`${videoData.videoViews} views`}</span>
          </div>
          <div className={styles['description-container']}>
            <span>{`${videoData.description}`}</span>
          </div>
          <hr />
          <Button
            content={'subscribe'}
            className={
              videoData.isUserSubscribeOnVideoChannel
                ? styles['subscribe-button-subscribed']
                : styles['subscribe-button-default']
            }
            onClick={handleSubscribe}
          />
          <div className={styles['author-info-container']}></div>
        </>
      </div>

      <div className={styles['chat-block']}>
        <VideoChatContainer comments={videoData.comments} />
      </div>
    </div>
  );
};

export { VideoPageContainer };
