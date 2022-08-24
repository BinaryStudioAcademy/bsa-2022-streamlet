import dayjs from 'dayjs';
import * as dayjsRelativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
import { FC, VideoCard as VideoCardType } from 'common/types/types';
import { AppRoutes, IconName, StreamingStatus } from 'common/enums/enums';
import { useState, useCallback, useEffect } from 'hooks/hooks';
import { Icon } from 'components/common/common';
import { ScheduledVideoBadge } from './components/components';
import { getDividedViewsString, getFormatDurationString, getHowLongAgoString } from 'helpers/helpers';
import { UPDATE_CARD_TIME_DELAY } from './config';
import styles from './styles.module.scss';
import defaultVideoPoster from 'assets/img/default-video-poster.jpg';

dayjs.extend(dayjsRelativeTime.default);

const FAKE_USER_AVATAR = 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745';

type Props = {
  video: VideoCardType;
};

const VideoCardMain: FC<Props> = ({
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

  const isSchedulePassed = useCallback((): boolean => {
    return dayjs(scheduledStreamDate).diff(timeNow) < 0;
  }, [timeNow, scheduledStreamDate]);

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
        <img src={poster ? poster : defaultVideoPoster} alt="Preview video img" />
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
        <div className={styles['video-card-desc']}>
          <Link to={linkToChannelPage} className={styles['video-card-channel']}>
            <img src={channelAvatar} alt="Channels avatar" />
          </Link>
          <div className={styles['video-card-name']}>
            <Link to={linkToVideoPage} className={styles['video-card-title']}>
              {name}
            </Link>
            <div className={styles['video-card-author']}>
              <Link to={linkToChannelPage} className={styles['video-card-author-name']}>
                <span>{channel.name}</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles['video-card-meta-footer']}>
          {!isWaiting && (
            <>
              {isLive && (
                <div className={styles['video-card-meta-tag']}>
                  <Icon name={IconName.CIRCLE} />
                  <span>Live</span>
                </div>
              )}
              <div className={styles['video-card-meta']}>
                <div className={styles['video-card-meta-data']}>
                  <Icon name={IconName.WATCH} />
                  {views}
                </div>
                <div className={styles['video-card-meta-data']}>
                  <Icon name={IconName.TIME_AGO} />
                  {getHowLongAgoString(new Date(publishedAt))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export { VideoCardMain };
