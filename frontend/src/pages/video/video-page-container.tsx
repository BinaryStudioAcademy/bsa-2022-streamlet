import clsx from 'clsx';
import { useLayoutEffect } from 'react';
import { AppRoutes, DataStatus, SocketEvents, StreamStatus } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Loader } from 'components/common/common';
import { VideoChatContainer } from 'components/video-chat/video-chat-container';
import {
  useAppDispatch,
  useAppSelector,
  useNavigate,
  useParams,
  useState,
  useEffect,
  useRef,
  useCallback,
  useLocation,
  useWindowDimensions,
} from 'hooks/hooks';
import { statsActions, videoPageActions } from 'store/actions';
import styles from './video-page.module.scss';
import { VideoPlayer } from 'components/common/video-player/video-player';
import { VideoCommentBlock } from './common/comment-block/comment-block';
import { socket } from 'common/config/config';
import { store } from 'store/store';
import { ChannelInfoRow } from './channel-info-row/channel-info-row';
import { VideoHeader } from './video-header/video-header';
import { LinksBlock } from './links-block/links-block';
import { NotFound } from 'components/placeholder-page';
import { resetPaginationMainPage } from 'store/videos/actions';
import { setPathForBackToStreamVideo } from 'store/auth/actions';
import { UPDATE_VIDEO_STAT_TIME_DELAY } from './config';
import { createCounter, getDeviceCategoryByNavigator } from 'helpers/helpers';

socket.on(SocketEvents.video.UPDATE_LIVE_VIEWS_DONE, ({ live }) => {
  store.dispatch(videoPageActions.updateLiveViews(live));
});

const SIZE_BLOCK_WITH_HIDDEN_CHAT = 41;
const SCREEN_SIZE_AT_WHICH_CHAT_MOVES = 992;

const getStatId = createCounter();

const VideoPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const { pathname } = useLocation();
  const { videoId: isVideoIdProvided } = useParams();
  const [isReactChanged, setReactState] = useState<boolean | string>(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const [heightVideo, setHeightVideo] = useState(0);
  const [isHideChat, setIsHideChat] = useState(true);

  if (!isVideoIdProvided) {
    navigate(AppRoutes.ANY, { replace: true });
  }

  const {
    videoData,
    profile,
    user,
    channel,
    videoDataStatus,
    isLightTheme,
    pathForBackToStreamVideo,
    subscriptionsIds,
    videoStats,
    playerTime,
  } = useAppSelector((state) => ({
    videoData: state.videoPage.video,
    profile: state.profile.profileData,
    user: state.auth.user,
    channel: state.videoPage.video?.channel,
    videoDataStatus: state.videoPage.dataStatus,
    isLightTheme: state.theme.isLightTheme,
    pathForBackToStreamVideo: state.auth.pathForBackToStreamVideo,
    subscriptionsIds: state.subscriptions.subscriptionsData.subscriptionsList.ids,
    videoStats: state.stats.video.data,
    playerTime: state.stats.video.playerTime,
  }));

  useEffect(() => {
    if (pathForBackToStreamVideo) {
      dispatch(setPathForBackToStreamVideo(null));
    }
  }, [dispatch, pathForBackToStreamVideo]);

  const updateVideoStatTimeDelay = UPDATE_VIDEO_STAT_TIME_DELAY * 1000;
  const updateVideoPlayerTimeDelay = UPDATE_VIDEO_STAT_TIME_DELAY - 5;

  const [statId, setStatId] = useState(0);

  const videoId = isVideoIdProvided as string;

  const handleHideChat = (param: boolean): void => {
    setIsHideChat(param);
  };

  useEffect(() => {
    setReactState(false);
  }, [videoId]);

  useEffect(() => {
    if (isReactChanged) {
      dispatch(videoPageActions.getVideoWithoutRecommended(videoId));
    }
    if (!isReactChanged) {
      dispatch(videoPageActions.getVideo(videoId));
    }
  }, [videoId, dispatch, isReactChanged]);

  useEffect(() => {
    return () => {
      dispatch(videoPageActions.resetVideoPage());
      dispatch(resetPaginationMainPage());
    };
  }, [dispatch]);

  const handleCommentLikeReact = useCallback(
    (commentId: string): void => {
      dispatch(videoPageActions.commentReact({ commentId, isLike: true }));

      const generatedUniqueString = String(new Date());
      setReactState(generatedUniqueString);
    },
    [dispatch],
  );

  const handleCommentDislikeReact = useCallback(
    (commentId: string): void => {
      dispatch(videoPageActions.commentReact({ commentId, isLike: false }));

      const generatedUniqueString = String(new Date());
      setReactState(generatedUniqueString);
    },
    [dispatch],
  );

  const handleMessageSubmit = (text: string): void => {
    if (!user) {
      navigate({ pathname: AppRoutes.SIGN_IN, hash: pathname });
      return;
    }

    dispatch(videoPageActions.addVideoComment({ videoId, text }))
      .unwrap()
      .then(() => {
        dispatch(
          statsActions.updateVideoStat({
            statId: statId,
            data: {
              videoId: videoId,
              commentsActivity: 1,
            },
          }),
        );
      });

    const generatedUniqueString = String(new Date());
    setReactState(generatedUniqueString);
  };

  const handlerCancelForReplyForm = (): void => {
    return void 1;
  };

  useLayoutEffect(() => {
    setHeightVideo(videoRef.current ? videoRef.current.clientHeight : 0);
  }, [width, videoData]);

  const source = pathname.split('/')[1];
  const wasSubscribed = subscriptionsIds.includes(videoData?.channel.id ?? '');

  const handleAddVideoStat = useCallback((): void => {
    if (videoData?.id) {
      const curStatId = getStatId();
      dispatch(
        statsActions.addVideoStat({
          statId: curStatId,
          data: {
            videoId: videoData?.id,
            watchTime: 0,
            device: getDeviceCategoryByNavigator(window.navigator),
            language: window.navigator.language,
            isLive: videoData?.status === StreamStatus.LIVE,
            durationStamp: playerTime,
            wasSubscribed,
            source,
          },
        }),
      );
      setStatId(curStatId);
    }
  }, [videoData?.id, videoData?.status, playerTime, dispatch, source, wasSubscribed]);

  useEffect(() => {
    handleAddVideoStat();

    const updateTimeInterval = setInterval(() => {
      handleAddVideoStat();
    }, updateVideoStatTimeDelay);

    return () => clearInterval(updateTimeInterval);
  }, [updateVideoStatTimeDelay, handleAddVideoStat]);

  useEffect(() => {
    if (Object.keys(videoStats).length !== 0) {
      dispatch(statsActions.sendVideoStats(videoStats));
    }
  }, [videoStats, dispatch]);

  if (videoDataStatus === DataStatus.REJECTED) {
    return <NotFound />;
  }

  if (!videoData || !channel) {
    return <Loader hCentered={true} vCentered={true} spinnerSize={'lg'} />;
  }

  const { status } = videoData;
  const isVideoFinished = status === StreamStatus.FINISHED;

  const handlePlay = (): void => {
    dispatch(videoPageActions.addVideoView());
  };

  return (
    <div
      className={clsx(styles['video-page'], {
        [styles['finished']]: isVideoFinished,
      })}
    >
      <div ref={videoRef} className={styles['video-block']}>
        <VideoPlayer
          sizingProps={{ aspectRatio: '16 / 9' }}
          url={videoData.videoPath}
          isLive={videoData.status === StreamStatus.LIVE}
          videoAttributes={{ poster: videoData.poster }}
          className={styles['video-player']}
          onStartPlay={handlePlay}
          statsData={{ statId, videoId, timer: updateVideoPlayerTimeDelay }}
        />
      </div>
      <div className={styles['video-info-block']}>
        <VideoHeader videoInfo={videoData} statsData={{ statId, videoId }} />
        <hr />
        <ChannelInfoRow channelInfo={channel} statsData={{ statId, videoId }} />
        <div className={styles['description-container']}>
          <span>{`${videoData.description}`}</span>
        </div>
        <hr />
      </div>
      <div className={styles['side-block']}>
        {!isVideoFinished && (
          <div
            className={styles['chat-block']}
            style={
              heightVideo && isHideChat
                ? { height: width > SCREEN_SIZE_AT_WHICH_CHAT_MOVES ? heightVideo : 'auto' }
                : { height: SIZE_BLOCK_WITH_HIDDEN_CHAT }
            }
          >
            <VideoChatContainer
              heightVideoBlock={heightVideo}
              videoId={videoId}
              handleHideChat={handleHideChat}
              statsData={{ statId, videoId }}
            />
          </div>
        )}
        <LinksBlock videoId={videoId} />
      </div>
      {isVideoFinished && (
        <div className={styles['video-comment-block']}>
          <VideoCommentBlock
            namingInfo={{
              userName: profile?.username ?? '',
              firstName: profile?.firstName,
              lastName: profile?.lastName,
            }}
            isLightTheme={isLightTheme}
            onNewComment={handleMessageSubmit}
            userAvatar={profile?.avatar}
            comments={videoData.comments}
            onLike={handleCommentLikeReact}
            onDislike={handleCommentDislikeReact}
            handlerCancelForReplyForm={handlerCancelForReplyForm}
            statsData={{ statId, videoId }}
          />
        </div>
      )}
    </div>
  );
};
export { VideoPageContainer };
