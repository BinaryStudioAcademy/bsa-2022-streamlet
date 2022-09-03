import clsx from 'clsx';
import { AppRoutes, SocketEvents, StreamingStatus } from 'common/enums/enums';
import { Loader } from 'components/common/common';
import { VideoChatContainer } from 'components/video-chat/video-chat-container';
import { useAppDispatch, useAppSelector, useNavigate, useParams, useState } from 'hooks/hooks';
import { FC, useEffect, useCallback } from 'react';
import { videoPageActions } from 'store/actions';
import styles from './video-page.module.scss';
import { VideoPlayer } from 'components/common/video-player/video-player';
import { VideoCommentBlock } from './common/comment-block/comment-block';
import { socket } from 'common/config/config';
import { store } from 'store/store';
import { ChannelInfoRow } from './channel-info-row/channel-info-row';
import { VideoHeader } from './video-header/video-header';
import { LinksBlock } from './links-block/links-block';

socket.on(SocketEvents.video.UPDATE_LIVE_VIEWS_DONE, ({ live }) => {
  store.dispatch(videoPageActions.updateLiveViews(live));
});

const VideoPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { videoId: isVideoIdProvided } = useParams();
  const [isReactChanged, setReactState] = useState(false);
  if (!isVideoIdProvided) {
    navigate(AppRoutes.ANY, { replace: true });
  }

  const { videoData, profile, user, channel } = useAppSelector((state) => ({
    videoData: state.videoPage.video,
    profile: state.profile.profileData,
    user: state.auth.user,
    channel: state.videoPage.video?.channel,
  }));

  const videoId = isVideoIdProvided as string;

  useEffect(() => {
    dispatch(videoPageActions.getVideo(videoId));
    setReactState(false);
  }, [videoId, dispatch, isReactChanged]);

  const handleCommentLikeReact = useCallback(
    (commentId: string): void => {
      dispatch(videoPageActions.commentReact({ commentId, isLike: true }));
      setReactState(true);
    },
    [dispatch],
  );

  const handleCommentDislikeReact = useCallback(
    (commentId: string): void => {
      dispatch(videoPageActions.commentReact({ commentId, isLike: false }));
      setReactState(true);
    },
    [dispatch],
  );

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
      </div>
      <div className={styles['video-info-block']}>
        <VideoHeader videoInfo={videoData} />
        <hr />
        <ChannelInfoRow channelInfo={channel} />
        <div className={styles['description-container']}>
          <span>{`${videoData.description}`}</span>
        </div>
        <hr />
      </div>
      <div className={styles['side-block']}>
        {!isVideoFinished && (
          <div className={styles['chat-block']}>
            <VideoChatContainer videoId={videoId} popOutSetting={true} />
          </div>
        )}
        <LinksBlock />
      </div>
      {isVideoFinished && (
        <div className={styles['video-comment-block']}>
          <VideoCommentBlock
            namingInfo={{
              userName: profile?.username ?? '',
              firstName: profile?.firstName,
              lastName: profile?.lastName,
            }}
            onNewComment={handleMessageSubmit}
            userAvatar={profile?.avatar}
            comments={videoData.comments}
            onLike={handleCommentLikeReact}
            onDislike={handleCommentDislikeReact}
          />
        </div>
      )}
    </div>
  );
};
export { VideoPageContainer };
