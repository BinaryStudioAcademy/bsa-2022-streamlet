import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { FC, useState } from 'react';
import { StreamingStatus, VideoReaction } from 'shared/build';
import { videoPageActions } from 'store/actions';
import styles from './styles.module.scss';
import { ReactComponent as ThumbUp } from 'assets/img/thumb-up.svg';
import { ReactComponent as ThumbDown } from 'assets/img/thumb-down.svg';
import { getReactBtnColor } from 'helpers/helpers';
import { NeedSignInModal } from 'components/common/sign-in-modal/sign-in-modal';
import clsx from 'clsx';

type Props = {
  videoInfo: {
    id: string;
    name: string;
    userReaction: VideoReaction | null;
    likeNum: number;
    dislikeNum: number;
    status: string;
    videoViews: number;
    liveViews: number;
  };
};

const VideoHeader: FC<Props> = ({ videoInfo }) => {
  const [isUserNotAuthAndReact, setIsUserNotAuthAndReact] = useState(false);
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => {
    return state.auth.user;
  });

  const handleLikeReact = (): void => {
    if (!user) {
      return setIsUserNotAuthAndReact(true);
    }
    dispatch(videoPageActions.videoReact({ videoId: videoInfo.id, isLike: true }));
  };

  const handleDislikeReact = (): void => {
    if (!user) {
      return setIsUserNotAuthAndReact(true);
    }
    dispatch(videoPageActions.videoReact({ videoId: videoInfo.id, isLike: false }));
  };

  return (
    <div className={styles['header']}>
      <h2 className={styles['video-title']}>{videoInfo.name}</h2>
      <div className={styles['video-secondary-info']}>
        <span className={styles['video-views']}>{`${
          videoInfo.status === StreamingStatus.FINISHED ? videoInfo.videoViews : videoInfo.liveViews
        } views`}</span>
        <div className={styles['reaction-block']}>
          <div className={styles['reaction-container']} onClick={handleLikeReact}>
            <ThumbUp
              height={'25'}
              width={'25'}
              className={styles['reaction-button']}
              color={getReactBtnColor(videoInfo.userReaction, true)}
            />
            {isUserNotAuthAndReact && (
              <NeedSignInModal
                headerText={'Like this video?'}
                className={styles['sign-in-modal']}
                mainText={'Sign in so we can take your opinion into account.'}
                onClose={(): void => {
                  setIsUserNotAuthAndReact(false);
                }}
              />
            )}
            <span>{videoInfo.likeNum}</span>
          </div>
          <div className={styles['reaction-container']} onClick={handleDislikeReact}>
            <ThumbDown
              height={'25'}
              width={'25'}
              className={clsx(styles['reaction-button'], styles['dislike-icon'])}
              color={getReactBtnColor(videoInfo.userReaction, false)}
            />
            <span>{videoInfo.dislikeNum}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { VideoHeader };
