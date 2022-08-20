import { ChannelBaseResponse, FC, UserBaseResponseDto } from 'common/types/types';
import { VideoChatContainer } from 'components/video-chat/video-chat-container';
import styles from './video-page.module.scss';
import { Button, Icon, Loader } from '../../components/common/common';
import { AppRoute, IconName } from '../../common/enums/enums';
import { useAppDispatch, useAppSelector, useEffect, useNavigate } from '../../hooks/hooks';
import defaultAvatar from '../../assets/img/default-user-avatar.jpg';
import { videoActions, channelActions } from '../../store/actions';
import { VideoBaseResponseDto } from '../../common/types/video/video';
import clsx from 'clsx';
import { getReactBtnColor } from './common/helper/get-react-btn-color';

const VideoPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const videoData: VideoBaseResponseDto | null = useAppSelector((state) => {
    return state.video.video;
  });

  useEffect(() => {
    dispatch(videoActions.getVideo('90862886-dab4-4777-9b1d-62a0f541559e'));
  }, [dispatch]);

  useEffect(() => {
    if (!videoData) {
      return;
    }
    dispatch(channelActions.getChannel(videoData.channelId));
  }, [dispatch, videoData]);

  const user: UserBaseResponseDto | null = useAppSelector((state) => {
    return state.auth.user;
  });

  const channel: ChannelBaseResponse | null = useAppSelector((state) => {
    return state.channel.channel;
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

  const handleMessageSubmit = (text: string): void => {
    if (!user) {
      navigate(AppRoute.SIGN_IN, { replace: true });
      return;
    }
    dispatch(videoActions.addVideoComment({ videoId: '90862886-dab4-4777-9b1d-62a0f541559e', text }));
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

  if (!videoData || !channel) {
    return <Loader hCentered={true} vCentered={true} spinnerSize={'lg'} />;
  }

  const { userReaction, isUserSubscribeOnVideoChannel } = videoData;
  return (
    <div className={styles['video-page']}>
      <div className={styles['video-block']} />
      <div className={styles['video-info-block']}>
        <div className={styles['video-header']}>
          <h2 className={styles['video-block-header']}>{videoData.name}</h2>
          <div className={styles['reaction-block']}>
            <div className={styles['reaction-container']}>
              <Icon
                onClick={handleLikeReact}
                name={IconName.THUMB_UP}
                color={getReactBtnColor(userReaction, true)}
                height={'25'}
                width={'25'}
              />
              <span>{videoData.likeNum}</span>
            </div>
            <div className={styles['reaction-container']}>
              <Icon
                onClick={handleDisLikeReact}
                name={IconName.THUMB_DOWN}
                color={getReactBtnColor(userReaction, false)}
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
          <div className={styles['channel-info-container']}>
            <div className={styles['about-channel-block']}>
              <img
                className={styles['channel-banner']}
                alt={'user avatar'}
                src={channel?.bannerImage ? channel.bannerImage : defaultAvatar}
              />
              <div className={styles['channel-description']}>
                <span>{channel.name}</span>
              </div>
            </div>
            <Button
              content={'subscribe'}
              className={clsx({
                [styles['subscribe-button-basic']]: true,
                [styles['subscribe-button-default']]: !isUserSubscribeOnVideoChannel,
                [styles['subscribe-button-subscribed']]: isUserSubscribeOnVideoChannel,
              })}
              onClick={handleSubscribe}
            />
          </div>
        </>
      </div>

      <div className={styles['chat-block']}>
        <VideoChatContainer comments={videoData.comments} handlerSubmitMessage={handleMessageSubmit} />
      </div>
    </div>
  );
};

export { VideoPageContainer };
