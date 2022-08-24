import dayjs from 'dayjs';
import * as dayjsRelativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
import { FC, VideoCard as VideoCardType } from 'common/types/types';
import { AppRoutes, IconName, StreamingStatus, VideoTagName } from 'common/enums/enums';
import { useState, useCallback, useEffect } from 'hooks/hooks';
import { Icon } from 'components/common/common';
import { VideoTag } from '../common/common';
import { MetaDataVideo, MetaDataWait, ScheduledVideoBadge } from './components/components';
import { IS_NEW_VIDEO_TIME_DELAY, UPDATE_CARD_TIME_DELAY } from './config';
import { getDividedViewsString, getFormatDurationString } from 'helpers/helpers';
import styles from './styles.module.scss';

dayjs.extend(dayjsRelativeTime.default);

const FAKE_USER_AVATAR = 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745';

type Props = {
  video: VideoCardType;
};

const VideoCard: FC<Props> = ({
  video: { id, name, status, publishedAt, scheduledStreamDate, poster, duration, videoViews, liveViews, channel },
}) => {
  const [timeNow, setTimeNow] = useState(dayjs());

  const isWaiting = status === StreamingStatus.WAITING;
  const isLive = status === StreamingStatus.LIVE;
  const isFinished = status === StreamingStatus.FINISHED;

  const updateTimeDelay = UPDATE_CARD_TIME_DELAY;

  const linkToVideoPage = `${AppRoutes.VIDEO}/${id}`;
  const linkToChannelPage = `${AppRoutes.CHANNEL}/${id}`;

  const channelAvatar = channel.avatar ? channel.avatar : FAKE_USER_AVATAR;
  const videoDuration = getFormatDurationString(duration);
  const views = getDividedViewsString(isFinished ? videoViews : liveViews);

  const isNew = useCallback((): boolean => {
    const maxTimeFromNowIsNew = IS_NEW_VIDEO_TIME_DELAY;
    return timeNow.diff(dayjs(publishedAt)) <= maxTimeFromNowIsNew;
  }, [timeNow, publishedAt]);

  const isSchedulePassed = useCallback((): boolean => {
    return dayjs(scheduledStreamDate).diff(timeNow) < 0;
  }, [timeNow, scheduledStreamDate]);

  const getFormatScheduledStreamDateFor = (): string => dayjs(scheduledStreamDate).format('D/M/YY, H:mm A');
  const getFormatScheduledStreamDateLiveIn = useCallback((): string => {
    return timeNow.to(dayjs(scheduledStreamDate));
  }, [timeNow, scheduledStreamDate]);

  const handleClickNotifyBtn = (): void => void 0;

  useEffect(() => {
    const updateTimeInterval = setInterval(() => {
      setTimeNow(dayjs());
    }, updateTimeDelay);
    return () => clearInterval(updateTimeInterval);
  }, [updateTimeDelay]);

  return (
    <div className={styles['video-card']}>
      <div className={styles['video-card-preview']}>
        <img src={poster} alt="Preview video img" />
        <Link to={linkToVideoPage} className={styles['video-card-play']}>
          <div className={styles['video-card-play-btn']}>
            <Icon name={IconName.PLAY} />
          </div>
          {isFinished && <span className={styles['video-card-badge-duration']}>{videoDuration}</span>}
        </Link>
        {isWaiting && (
          <ScheduledVideoBadge
            channelName={channel.name}
            isSchedulePassed={isSchedulePassed()}
            scheduledStreamDate={scheduledStreamDate}
            isLiveIn={getFormatScheduledStreamDateLiveIn()}
            handleClickNotifyBtn={handleClickNotifyBtn}
          />
        )}
      </div>
      <div className={styles['video-card-info']}>
        <Link to={linkToChannelPage} className={styles['video-card-channel']}>
          <img className={styles['avatar']} src={channelAvatar} alt="Channels avatar" />
        </Link>
        <div className={styles['video-card-desc']}>
          <Link to={linkToVideoPage} className={styles['video-card-title']}>
            {name}
          </Link>
          {isWaiting && !isSchedulePassed() && (
            <MetaDataWait
              scheduledStreamDateFor={getFormatScheduledStreamDateFor()}
              handleClickNotifyBtn={handleClickNotifyBtn}
            />
          )}
          <div className={styles['video-card-author']}>
            <Link to={linkToChannelPage} className={styles['video-card-author-avatar']}>
              <img className={styles['avatar']} src={channelAvatar} alt="Channels avatar" />
            </Link>
            <Link to={linkToChannelPage} className={styles['video-card-author-name']}>
              <span>{channel.name}</span>
            </Link>
          </div>
          <div className={styles['video-card-tag-list']}>
            {isLive && (
              <div className={styles['video-card-tag-live']}>
                <VideoTag name={VideoTagName.LIVE} />
              </div>
            )}
            {(isLive || isFinished) && isNew() && <VideoTag name={VideoTagName.NEW} />}
          </div>
        </div>
        <div className={styles['video-card-meta-footer']}>
          {isLive && (
            <div className={styles['video-card-meta-tag']}>
              <Icon name={IconName.CIRCLE} />
              <span>Live</span>
            </div>
          )}
          {!isWaiting && <MetaDataVideo views={views} publishedAt={publishedAt} />}
        </div>
      </div>
    </div>
  );
};

export { VideoCard };
