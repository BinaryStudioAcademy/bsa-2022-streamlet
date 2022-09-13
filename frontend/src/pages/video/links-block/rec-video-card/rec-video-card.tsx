import dayjs from 'dayjs';
import * as dayjsRelativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
import { FC, VideoCard as VideoCardType } from 'common/types/types';
import { AppRoutes, IconName, StreamStatus, VideoTagName } from 'common/enums/enums';
import { useState, useCallback, useEffect, useAppSelector } from 'hooks/hooks';
import { Icon } from 'components/common/common';
import { MetaDataVideo, MetaDataWait, ScheduledVideoBadge } from './components/components';
import { IS_NEW_VIDEO_TIME_DELAY, UPDATE_CARD_TIME_DELAY } from './config';
import { getDividedViewsString, getFormatDurationString } from 'helpers/helpers';
import styles from './styles.module.scss';
import defaultVideoPosterDark from 'assets/img/default-video-poster-dark.jpg';
import defaultVideoPosterLight from 'assets/img/default-video-poster-light.jpg';
import clsx from 'clsx';
import { VideoTag } from 'components/common/video-tag/video-tag';

dayjs.extend(dayjsRelativeTime.default);

type Props = {
  video: VideoCardType;
};

const RecVideoCard: FC<Props> = ({
  video: { id, name, status, publishedAt, scheduledStreamDate, poster, duration, videoViews, liveViews, channel },
}) => {
  const [timeNow, setTimeNow] = useState(dayjs());
  const isLightTheme = useAppSelector((state) => state.theme.isLightTheme);

  const isWaiting = status === StreamStatus.WAITING;
  const isLive = status === StreamStatus.LIVE;
  const isFinished = status === StreamStatus.FINISHED;

  const updateTimeDelay = UPDATE_CARD_TIME_DELAY;

  const linkToVideoPage = `${AppRoutes.VIDEO}/${id}`;
  const linkToChannelPage = `${AppRoutes.CHANNEL}/${channel.id}`;

  const videoPoster = poster ? poster : isLightTheme ? defaultVideoPosterLight : defaultVideoPosterDark;
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
        <img src={videoPoster} alt="Preview video img" />
        <Link to={linkToVideoPage} className={styles['video-card-play']}>
          {isFinished && <span className={styles['video-card-badge-duration']}>{videoDuration}</span>}
          {isLive && (
            <div className={clsx(styles['video-card-meta-tag'], styles['live-label'])}>
              <Icon name={IconName.ONLINE_STREAMING_2} />
              <span>Live</span>
            </div>
          )}
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
      <div className={styles['video-card-desc']}>
        <Link to={linkToVideoPage} className={styles['video-card-title']} title={name}>
          {name}
        </Link>
        <MetaDataVideo views={views} publishedAt={publishedAt} />
        <div className={styles['video-card-author']}>
          <Link to={linkToChannelPage} className={styles['video-card-author-name']} title={channel.name}>
            {channel.name}
          </Link>
        </div>
        {isWaiting && !isSchedulePassed() && (
          <MetaDataWait
            scheduledStreamDateFor={getFormatScheduledStreamDateFor()}
            handleClickNotifyBtn={handleClickNotifyBtn}
          />
        )}
        <div className={styles['video-card-tag-list']}>
          {isLive && (
            <div className={clsx(styles['video-card-tag-live'], styles['live-label'])}>
              <Icon name={IconName.ONLINE_STREAMING_2} />
              <span>Live</span>
            </div>
          )}
          {(isLive || isFinished) && isNew() && <VideoTag name={VideoTagName.NEW} />}
        </div>
      </div>
    </div>
  );
};

export { RecVideoCard };
