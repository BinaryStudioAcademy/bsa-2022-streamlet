import clsx from 'clsx';
import { AppRoutes } from 'common/enums/enums';
import { ReactComponent as ThumbUp } from 'assets/img/thumb-up.svg';
import { ReactComponent as ThumbDown } from 'assets/img/thumb-down.svg';
import { Button, Loader } from 'components/common/common';
import { VideoChatContainer } from 'components/video-chat/video-chat-container';
import { useAppDispatch, useAppSelector, useNavigate, useParams } from 'hooks/hooks';
import { FC, useEffect } from 'react';
import { videoPageActions } from 'store/actions';
import defaultAvatar from '../../assets/img/default-user-avatar.jpg';
import styles from './video-page.module.scss';

const VideoPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { videoId: isVideoIdProvided } = useParams();

  if (!isVideoIdProvided) {
    navigate(AppRoutes.ANY, { replace: true });
  }

  const videoId = isVideoIdProvided as string;

  const videoData = useAppSelector((state) => {
    return state.videoPage.video;
  });

  useEffect(() => {
    dispatch(videoPageActions.getVideo(videoId));
  }, [videoId, dispatch]);

  const user = useAppSelector((state) => {
    return state.auth.user;
  });

  const channel = useAppSelector((state) => {
    return state.videoPage.video?.channel;
  });

  // const handleLikeReact = (): void => {
  //   if (!user) {
  //     navigate(AppRoutes.SIGN_IN);
  //     return;
  //   }
  //   dispatch(videoActions.videoReact({ videoId, isLike: true }));
  // };

  // const handleDisLikeReact = (): void => {
  //   if (!user) {
  //     navigate(AppRoutes.SIGN_IN);
  //     return;
  //   }
  //   dispatch(videoPageActions.videoReact({ videoId, isLike: false }));
  // };

  const handleMessageSubmit = (_text: string): void => {
    return;
  };

  const handleSubscribe = (): void => {
    if (!user) {
      navigate(AppRoutes.SIGN_IN);
      return;
    }
    if (!videoData) {
      return;
    }
    return;
  };

  if (!videoData || !channel) {
    return <Loader hCentered={true} vCentered={true} spinnerSize={'lg'} />;
  }

  const { isUserSubscribedOnChannel } = videoData;
  return (
    <div className={styles['video-page']}>
      <div className={styles['video-block']} />
      <div className={styles['video-info-block']}>
        <div className={styles['video-header']}>
          <h2 className={styles['video-block-header']}>{videoData.name}</h2>
          <div className={styles['reaction-block']}>
            <div className={styles['reaction-container']}>
              <ThumbUp height={'25'} width={'25'} />
              <span>{videoData.likeNum}</span>
            </div>
            <div className={styles['reaction-container']}>
              <ThumbDown height={'25'} width={'25'} />
              <span>{videoData.dislikeNum}</span>
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
                src={channel.avatar ? channel.avatar : defaultAvatar}
              />
              <div className={styles['channel-description']}>
                <span>{channel.name}</span>
              </div>
            </div>
            <Button
              content={'subscribe'}
              className={clsx({
                [styles['subscribe-button-basic']]: true,
                [styles['subscribe-button-default']]: !isUserSubscribedOnChannel,
                [styles['subscribe-button-subscribed']]: isUserSubscribedOnChannel,
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
