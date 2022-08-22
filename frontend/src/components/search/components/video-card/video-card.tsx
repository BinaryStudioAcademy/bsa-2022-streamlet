import { MouseEvent } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import * as dayjsDuration from 'dayjs/plugin/duration';
import * as dayjsRelativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
import { FC, VideoCard as VideoCardType } from 'common/types/types';
import { AppRoute, IconName, StreamingStatus, VideoTagName } from 'common/enums/enums';
import { Icon } from 'components/common/common';
import { VideoTag } from '../common/common';
import { getHowLongAgoString } from 'helpers/helpers';
import styles from './styles.module.scss';

dayjs.extend(dayjsDuration.default);
dayjs.extend(dayjsRelativeTime.default);

const FAKE_USER_AVATAR = 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745';

type Props = {
  video: VideoCardType;
};

const VideoCard: FC<Props> = ({
  video: { id, name, status, publishedAt, scheduledStreamDate, poster, duration, videoViews, liveViews, channel },
}) => {
  const linkToVideoPage = `${AppRoute.VIDEO}/${id}`;
  const linkToChannelPage = `${AppRoute.CHANNEL}/${id}`;

  const channelAvatar = channel.avatar ? channel.avatar : FAKE_USER_AVATAR;

  const isNew = (): boolean => {
    const maxTimeFromNowIsNew = 4 * 60 * 60 * 1000; // 4 hours
    return dayjs().diff(dayjs(publishedAt)) <= maxTimeFromNowIsNew;
  };

  const isWaiting = status === StreamingStatus.WAITING;
  const isLive = status === StreamingStatus.LIVE;
  const isFinished = status === StreamingStatus.FINISHED;

  const getDurationString = (): string => {
    const d = dayjs.duration(duration * 1000);
    if (d.hours() > 9) {
      return d.format('HH:mm:ss');
    }
    if (d.hours()) {
      return d.format('H:mm:ss');
    }
    if (d.minutes() > 9) {
      return d.format('mm:ss');
    }
    return d.format('m:ss');
  };

  const getDividedViewString = (): string => {
    const view = isFinished ? videoViews : liveViews;
    return view.toLocaleString();
  };

  const getFormatScheduledStreamDateFor = (): string => dayjs(scheduledStreamDate).format('D/M/YY, H:mm A');
  const getFormatScheduledStreamDateLiveIn = (): string => dayjs().to(dayjs(scheduledStreamDate));
  const getFormatScheduledStreamDateAt = (): string => {
    const d = dayjs(scheduledStreamDate);
    return `${d.format('D MMMM')} at ${d.format('H:mm')}`;
  };

  const handleClickNotifyBtn = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const MetaData: FC = () =>
    isWaiting ? (
      <div className={clsx(styles['video-card-meta'], styles['video-card-meta-scheduled'])}>
        <div className={styles['video-card-meta-data']}>
          <span>{`Scheduled for ${getFormatScheduledStreamDateFor()}`}</span>
        </div>
        <div className={styles['video-card-meta-data']}>
          <div className={styles['video-card-meta-data-scheduled']} onClick={handleClickNotifyBtn}>
            <Icon name={IconName.BELL_OUTLINE} />
            <span>Notify me</span>
          </div>
        </div>
      </div>
    ) : (
      <div className={styles['video-card-meta']}>
        <div className={styles['video-card-meta-data']}>
          <Icon name={IconName.WATCH} />
          {getDividedViewString()}
        </div>
        <div className={styles['video-card-meta-data']}>
          <Icon name={IconName.TIME_AGO} />
          {getHowLongAgoString(new Date(publishedAt))}
        </div>
      </div>
    );

  return (
    <div className={styles['video-card']}>
      <div className={styles['video-card-preview']}>
        <img src={poster} alt="Preview video img" />
        <Link to={linkToVideoPage} className={styles['video-card-play']}>
          <div className={styles['video-card-play-btn']}>
            <Icon name={IconName.PLAY} />
          </div>
          {isFinished && <span className={styles['video-card-badge-duration']}>{getDurationString()}</span>}
        </Link>
        {isWaiting && (
          <div className={styles['video-card-badge-scheduled']}>
            <Icon name={IconName.ONLINE_STREAMING} />
            <div className={styles['video-card-badge-scheduled-data']}>
              <span>{`Live ${getFormatScheduledStreamDateLiveIn()}`}</span>
              <span>{getFormatScheduledStreamDateAt()}</span>
            </div>
            <div className={styles['video-card-badge-scheduled-btn']} onClick={handleClickNotifyBtn}>
              <Icon name={IconName.BELL_OUTLINE} />
              <span>Notify me</span>
            </div>
          </div>
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
          <MetaData />
          <div className={styles['video-card-author']}>
            <Link to={linkToChannelPage} className={styles['video-card-author-avatar']}>
              <img className={styles['avatar']} src={channelAvatar} alt="Channels avatar" />
            </Link>
            <Link to={linkToChannelPage} className={styles['video-card-author-name']}>
              <span>{channel.name}</span>
            </Link>
          </div>
          <div className={styles['video-card-tag-list']}>
            {isLive && <VideoTag name={VideoTagName.LIVE} />}
            {(isLive || isFinished) && isNew() && <VideoTag name={VideoTagName.NEW} />}
          </div>
        </div>
        <div className={styles['video-card-meta-footer']}>{!isWaiting && <MetaData />}</div>
      </div>
    </div>
  );
};

export { VideoCard };
