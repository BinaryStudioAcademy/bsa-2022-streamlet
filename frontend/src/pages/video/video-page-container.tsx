import clsx from 'clsx';
import { AppRoutes, StreamingStatus } from 'common/enums/enums';
import { ReactComponent as ThumbUp } from 'assets/img/thumb-up.svg';
import { ReactComponent as ThumbDown } from 'assets/img/thumb-down.svg';
import { Loader } from 'components/common/common';
import { VideoChatContainer } from 'components/video-chat/video-chat-container';
import { useAppDispatch, useAppSelector, useNavigate, useParams, useState } from 'hooks/hooks';
import { FC, useEffect } from 'react';
import { videoPageActions } from 'store/actions';
import defaultAvatar from '../../assets/img/default-user-avatar.jpg';
import styles from './video-page.module.scss';
import { getReactBtnColor } from 'helpers/helpers';
import { VideoPlayer } from 'components/common/video-player/video-player';
import { VideoCommentBlock } from './common/comment-block/comment-block';
import { Link } from 'react-router-dom';
import { NeedSignInModal } from './common/sign-in-modal/sign-in-modal';

const VideoPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { videoId: isVideoIdProvided } = useParams();
  const [isUserNotAuthAndReact, setIsUserNotAuthAndReact] = useState(false);
  if (!isVideoIdProvided) {
    navigate(AppRoutes.ANY, { replace: true });
  }

  const videoId = isVideoIdProvided as string;

  const videoData = useAppSelector((state) => {
    return state.videoPage.video;
  });

  const profile = useAppSelector((state) => {
    return state.profile.profileData;
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

  const handleLikeReact = (): void => {
    if (!user) {
      return setIsUserNotAuthAndReact(true);
    }
    dispatch(videoPageActions.videoReact({ videoId, isLike: true }));
  };

  const handleDislikeReact = (): void => {
    if (!user) {
      return setIsUserNotAuthAndReact(true);
    }
    dispatch(videoPageActions.videoReact({ videoId, isLike: false }));
  };

  const handleMessageSubmit = (text: string): void => {
    if (!user) {
      navigate(AppRoutes.SIGN_IN, { replace: true });
      return;
    }
    dispatch(videoPageActions.addVideoComment({ videoId, text }));
  };

  if (!videoData || !channel) {
    return <Loader hCentered={true} vCentered={true} spinnerSize={'lg'} />;
  }

  const { status } = videoData;
  const isVideoFinished = status === 'finished';

  const { userReaction } = videoData;

  return (
    <div
      className={clsx(styles['video-page'], {
        [styles['finished']]: isVideoFinished,
      })}
    >
      <div className={styles['video-block']}>
        <VideoPlayer
          sizingProps={{ aspectRatio: '16 / 9' }}
          url={videoData.videoPath}
          isLive={videoData.status === StreamingStatus.LIVE}
          videoAttributes={{ poster: videoData.poster }}
          className={styles['video-player']}
        />
        <div className={styles['video-info-block']}>
          <div className={styles['video-header']}>
            <h2 className={styles['video-title']}>{videoData.name}</h2>
            <div className={styles['reaction-block']}>
              <div className={styles['reaction-container']}>
                <ThumbUp
                  height={'25'}
                  width={'25'}
                  onClick={handleLikeReact}
                  className={styles['reaction-button']}
                  color={getReactBtnColor(userReaction, true)}
                />
                {isUserNotAuthAndReact && (
                  <NeedSignInModal
                    headerText={'Like this video?'}
                    mainText={'Sign in so we can take your opinion into account.'}
                    onClose={(): void => {
                      setIsUserNotAuthAndReact(false);
                    }}
                  />
                )}
                <span>{videoData.likeNum}</span>
              </div>
              <div className={styles['reaction-container']}>
                <ThumbDown
                  height={'25'}
                  width={'25'}
                  onClick={handleDislikeReact}
                  className={clsx(styles['reaction-button'], styles['dislike-icon'])}
                  color={getReactBtnColor(userReaction, false)}
                />
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
              <Link to={`${AppRoutes.CHANNEL}/${videoData.channel.id}`} style={{ textDecoration: 'none' }}>
                <div className={styles['about-channel-block']}>
                  <img
                    className={styles['channel-banner']}
                    alt={'user avatar'}
                    src={videoData.channel.avatar ? videoData.channel.avatar : defaultAvatar}
                  />
                  <div className={styles['channel-description']}>
                    <div>{videoData.channel.name}</div>
                  </div>
                </div>
              </Link>
            </div>
          </>
        </div>
      </div>
      {!isVideoFinished ? (
        <div className={styles['chat-block']}>
          <VideoChatContainer comments={videoData.comments} handlerSubmitMessage={handleMessageSubmit} />
        </div>
      ) : (
        <div className={styles['video-comment-block']}>
          <VideoCommentBlock
            onNewComment={handleMessageSubmit}
            userAvatar={profile?.avatar}
            comments={videoData.comments}
          />
        </div>
      )}
    </div>
  );
};
export { VideoPageContainer };
