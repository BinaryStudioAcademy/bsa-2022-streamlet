import dayjs from 'dayjs';
import * as dayjsRelativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
import { FC, VideoCard as VideoCardType } from 'common/types/types';
import { AppRoutes, IconName, StreamStatus, VideoTagName } from 'common/enums/enums';
import { useState, useCallback, useEffect } from 'hooks/hooks';
import { Icon } from 'components/common/common';
import { VideoTag } from '../common/common';
import { MetaDataVideo, MetaDataWait, ScheduledVideoBadge } from './components/components';
import { IS_NEW_VIDEO_TIME_DELAY, UPDATE_CARD_TIME_DELAY } from './config';
import { getDividedViewsString, getFormatDurationString } from 'helpers/helpers';
import styles from './styles.module.scss';
import defaultVideoPosterDark from 'assets/img/default-video-poster-dark.jpg';
import defaultVideoPosterLight from 'assets/img/default-video-poster-light.jpg';
import defaultUserAvatar from 'assets/img/default/user-avatar-default.jpg';
import clsx from 'clsx';

dayjs.extend(dayjsRelativeTime.default);

type Props = {
  video: VideoCardType;
  isLightTheme: boolean;
  classNames?: {
    videoCardClassName?: string;
    previewClassName?: string;
    infoClassName?: string;
    metaFooter?: string;
    metaClassName?: string;
    channelIcon?: string;
    author?: string;
    authorAvatar?: string;
    desc?: string;
  };
};

const VideoCard: FC<Props> = ({
  video: { id, name, status, publishedAt, scheduledStreamDate, poster, duration, videoViews, liveViews, channel },
  isLightTheme,
  classNames,
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
    <div className={clsx(styles['video-card'], classNames?.videoCardClassName)}>
      <div className={clsx(styles['video-card-preview'], classNames?.previewClassName)}>
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
      <div className={clsx(styles['video-card-info'], classNames?.infoClassName)}>
        <Link to={linkToChannelPage} className={clsx(styles['video-card-channel'], classNames?.channelIcon)}>
          <div style={{ backgroundImage: `url(${channelAvatar})` }} className={styles['avatar']} />
        </Link>
        <div className={clsx(styles['video-card-desc'], classNames?.desc)}>
          <Link to={linkToVideoPage} className={styles['video-card-title']} title={name}>
            {name}
          </Link>
          <MetaDataVideo views={views} publishedAt={publishedAt} className={classNames?.metaClassName} />
          <div className={clsx(styles['video-card-author'], classNames?.author)}>
            <Link to={linkToChannelPage} className={clsx(styles['video-card-author-avatar'], classNames?.authorAvatar)}>
              <div style={{ backgroundImage: `url(${channelAvatar})` }} className={styles['avatar']} />
            </Link>
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
        <div className={clsx(styles['video-card-meta-footer'], classNames?.metaFooter)}>
          {isLive && (
            <div className={clsx(styles['video-card-meta-tag'], styles['live-label'])}>
              <Icon name={IconName.ONLINE_STREAMING_2} />
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
