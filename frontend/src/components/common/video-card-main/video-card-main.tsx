import dayjs from 'dayjs';
import * as dayjsRelativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
import { FC, VideoCard as VideoCardType } from 'common/types/types';
import { AppRoutes, IconName, StreamStatus } from 'common/enums/enums';
import { useState, useCallback, useEffect } from 'hooks/hooks';
import { Icon, LiveIndicator } from 'components/common/common';
import { ScheduledVideoBadge } from './components/components';
import { getDividedViewsString, getFormatDurationString, getHowLongAgoString } from 'helpers/helpers';
import { UPDATE_CARD_TIME_DELAY } from './config';
import styles from './styles.module.scss';
import defaultVideoPosterDark from 'assets/img/default-video-poster-dark.jpg';
import defaultVideoPosterLight from 'assets/img/default-video-poster-light.jpg';
import defaultUserAvatar from 'assets/img/default/user-avatar-default.jpg';
import clsx from 'clsx';

dayjs.extend(dayjsRelativeTime.default);

type Props = {
  video: VideoCardType;
  isLightTheme: boolean;
  className?: string;
  // in case of need easily expand with other properties telling which info needs to be hidden
  // by default everything is shown
  hideFromDisplay?: {
    channelInfo?: boolean;
  };
};

const VideoCardMain: FC<Props> = ({
  video: { id, name, status, publishedAt, scheduledStreamDate, poster, duration, videoViews, liveViews, channel },
  isLightTheme,
  className,
  hideFromDisplay,
}) => {
  const [timeNow, setTimeNow] = useState(dayjs());

  const isWaiting = status === StreamStatus.WAITING;
  const isLive = status === StreamStatus.LIVE;
  const isFinished = status === StreamStatus.FINISHED;

  const updateTimeDelay = UPDATE_CARD_TIME_DELAY;

  const linkToVideoPage = `${AppRoutes.VIDEO}/${id}`;
  const linkToChannelPage = `${AppRoutes.CHANNEL}/${channel.id}`;

  const videoPoster = poster ? poster : isLightTheme ? defaultVideoPosterLight : defaultVideoPosterDark;
  const channelAvatar = channel.avatar ? channel.avatar : defaultUserAvatar;
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
    <div className={clsx(styles['video-card'], className)}>
      <div className={styles['video-card-preview']}>
        <img src={videoPoster} alt="Preview video img" />
        <Link to={linkToVideoPage} className={styles['video-card-play']}>
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
        {/* attach special classes like hide-channel to change layout for smaller number of elements */}
        <div className={clsx(styles['video-card-desc'], hideFromDisplay?.channelInfo && styles['hide-channel'])}>
          {hideFromDisplay?.channelInfo || (
            <Link to={linkToChannelPage} className={styles['video-card-channel']}>
              <div style={{ backgroundImage: `url(${channelAvatar})` }} className={styles['avatar']} />
            </Link>
          )}
          <div className={styles['video-card-name']}>
            <Link to={linkToVideoPage} className={styles['video-card-title']} title={name}>
              {name}
            </Link>
            {hideFromDisplay?.channelInfo || (
              <div className={styles['video-card-author']}>
                <Link to={linkToChannelPage} className={styles['video-card-author-name']} title={channel.name}>
                  {channel.name}
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className={styles['video-card-meta-footer']}>
          {!isWaiting && (
            <>
              {isLive && <LiveIndicator wrapperClassName={styles['video-card-meta-tag']} />}
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
