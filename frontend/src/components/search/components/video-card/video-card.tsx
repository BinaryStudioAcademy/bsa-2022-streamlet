import dayjs from 'dayjs';
import * as dayjsDuration from 'dayjs/plugin/duration';
import { FC, VideoCard as VideoCardType } from 'common/types/types';
import { IconName } from 'common/enums/components';
import { Icon } from 'components/common/common';
import { useNavigate } from 'hooks/hooks';
import { getHowLongAgoString } from 'helpers/helpers';
import { VideoTag } from '../common/common';
import styles from './styles.module.scss';

dayjs.extend(dayjsDuration.default);

type Props = {
  video: VideoCardType;
};

const VideoCard: FC<Props> = ({ video: { id, name, duration, videoViews, createdAt, preview, channel } }) => {
  const navigate = useNavigate();

  const redirectToVideoPage = (): void => navigate(`/video/${id}`, { replace: true });
  const redirectToChannelPage = (): void => navigate(`/channel/${channel.id}`, { replace: true });

  const isNew = (): boolean => {
    const maxTimeFromNowIsNew = 4 * 60 * 60 * 1000; // 4 hours
    return dayjs().diff(dayjs(createdAt)) <= maxTimeFromNowIsNew;
  };

  const getDurationString = (durationInSeconds: number): string => {
    const d = dayjs.duration(durationInSeconds * 1000);
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

  const getDividedViewString = (view: number): string => view.toLocaleString();

  return (
    <div className={styles['video-card']}>
      <div className={styles['video-card-preview']} onClick={redirectToVideoPage}>
        <img src={preview} alt="Preview video img" />
        <div className={styles['video-card-play']}>
          <div className={styles['video-card-play-btn']}>
            <Icon name={IconName.PLAY} />
          </div>
          <span className={styles['video-card-badge-duration']}>{getDurationString(duration)}</span>
        </div>
      </div>
      <div className={styles['video-card-info']}>
        <a className={styles['video-card-channel']} onClick={redirectToChannelPage}>
          <img className={styles['avatar']} src={channel.avatar} alt="Channels avatar" />
        </a>
        <div className={styles['video-card-desc']}>
          <a className={styles['video-card-title']} onClick={redirectToVideoPage}>
            {name}
          </a>
          <div className={styles['video-card-meta']}>
            <div className={styles['video-card-meta-data']}>
              <Icon name={IconName.WATCH} />
              {getDividedViewString(videoViews)}
            </div>
            <div className={styles['video-card-meta-data']}>
              <Icon name={IconName.TIMEAGO} />
              {getHowLongAgoString(new Date(createdAt))}
            </div>
          </div>
          <div className={styles['video-card-author']}>
            <a className={styles['video-card-author-avatar']} onClick={redirectToChannelPage}>
              <img className={styles['avatar']} src={channel.avatar} alt="Channels avatar" />
            </a>
            <a className={styles['video-card-author-name']} onClick={redirectToChannelPage}>
              <span>{channel.name}</span>
            </a>
          </div>
          <div className={styles['video-card-tag-list']}>{isNew() && <VideoTag name="new" />}</div>
        </div>
        <div className={styles['video-card-meta-footer']}>
          <div className={styles['video-card-meta-data']}>
            <Icon name={IconName.WATCH} />
            {getDividedViewString(videoViews)}
          </div>
          <div className={styles['video-card-meta-data']}>
            <Icon name={IconName.TIMEAGO} />
            {getHowLongAgoString(new Date(createdAt))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { VideoCard };
