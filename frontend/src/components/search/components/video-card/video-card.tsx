import { FC, VideoCard as VideoCardType } from 'common/types/types';
import { IconName } from 'common/enums/components';
import { Icon } from 'components/common/common';
import { useNavigate } from 'hooks/hooks';
import { getHowLongAgoString, joinExistingValues } from 'helpers/helpers';
import { VideoTag } from '../common/common';
import styles from './styles.module.scss';

type Props = {
  video: VideoCardType;
};

const VideoCard: FC<Props> = ({ video: { id, name, duration, videoViews, createdAt, preview, channel } }) => {
  const navigate = useNavigate();

  const redirectToVideoPage = (): void => navigate(`/video/${id}`, { replace: true });
  const redirectToChannelPage = (): void => navigate(`/channel/${channel.id}`, { replace: true });

  const isNew = (): boolean => {
    const date = new Date(createdAt);
    return Date.now() - date.getTime() <= 4 * 60 * 60 * 1000;
  };

  const getDurationString = (durationInSeconds: number): string => {
    const hr = Math.floor(durationInSeconds / 3600);
    const min = Math.floor((durationInSeconds % 3600) / 60);
    const sec = Math.floor(durationInSeconds % 60);

    const result = [`${hr > 0 ? hr + ':' : ''}`, `${hr && min < 10 ? '0' : ''}${min}:`, `${sec < 10 ? '0' : ''}${sec}`];
    return joinExistingValues(result, '');
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
