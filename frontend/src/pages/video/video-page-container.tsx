import { FC, ProfileUpdateResponseDto, UserBaseResponseDto } from 'common/types/types';
import { VideoChatContainer } from 'components/video-chat/video-chat-container';
import defaultAvatar from '../../assets/img/default-user-avatar.jpg';
import styles from './video-page.module.scss';
import { Icon, Loader } from '../../components/common/common';
import { AppRoutes, IconName } from '../../common/enums/enums';
import { useAppDispatch, useAppSelector, useEffect, useNavigate, useParams } from '../../hooks/hooks';
import { videoActions, channelActions } from '../../store/actions';
import { VideoBaseResponseDto } from '../../common/types/video/video';
import { getReactBtnColor } from '../../helpers/video/video';
import { CurrentChannelInfo } from '../../store/channel/reducer';
import clsx from 'clsx';
import { VideoPageCommentForm } from './add-comment-form/add-comment-form';

const VideoPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { videoId: isVideoIdProvided } = useParams();

  if (!isVideoIdProvided) {
    navigate(AppRoutes.ANY, { replace: true });
  }

  const videoId = isVideoIdProvided as string;

  const videoData: VideoBaseResponseDto | null = useAppSelector((state) => {
    return state.videos.videoForVideoPage;
  });

  const channelData: CurrentChannelInfo | null = useAppSelector((state) => {
    return state.channel.currentChannel.data;
  });

  const profile: ProfileUpdateResponseDto | null = useAppSelector((state) => {
    return state.profile.profileData;
  });

  useEffect(() => {
    dispatch(videoActions.getVideo(videoId as string));
  }, [videoId, dispatch]);

  useEffect(() => {
    if (videoData?.channelId) {
      const id = videoData.channelId;
      dispatch(channelActions.loadChannel({ id }));
    }
  }, [dispatch, videoData?.channelId]);

  const user: UserBaseResponseDto | null = useAppSelector((state) => {
    return state.auth.user;
  });

  const handleLikeReact = (): void => {
    if (!user) {
      navigate(AppRoutes.SIGN_IN, { replace: true });
      return;
    }
    dispatch(videoActions.videoReact({ videoId, isLike: true }));
  };

  const handleDisLikeReact = (): void => {
    if (!user) {
      navigate(AppRoutes.SIGN_IN, { replace: true });
      return;
    }
    dispatch(videoActions.videoReact({ videoId, isLike: false }));
  };

  const handleMessageSubmit = (text: string): void => {
    if (!user) {
      navigate(AppRoutes.SIGN_IN, { replace: true });
      return;
    }
    dispatch(videoActions.addVideoComment({ videoId, text }));
  };

  if (!videoData || !channelData || !profile) {
    return <Loader hCentered={true} vCentered={true} spinnerSize={'lg'} />;
  }

  const { userReaction, status } = videoData;
  const isVideoFinished = status === 'finished';

  return (
    <div
      className={clsx({
        [styles['video-page']]: !isVideoFinished,
        [styles['video-page-without-live']]: isVideoFinished,
      })}
    >
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
                src={channelData?.avatar ? channelData.avatar : defaultAvatar}
              />
              <div className={styles['channel-description']}>
                <span>{channelData?.name}</span>
              </div>
            </div>
          </div>
        </>
      </div>
      {!isVideoFinished && (
        <div className={styles['chat-block']}>
          <VideoChatContainer comments={videoData.comments} handlerSubmitMessage={handleMessageSubmit} />
        </div>
      )}
      <VideoPageCommentForm
        avatar={profile?.avatar}
        onSubmit={(): void => {
          handleMessageSubmit('test');
        }}
      />
    </div>
  );
};
export { VideoPageContainer };
