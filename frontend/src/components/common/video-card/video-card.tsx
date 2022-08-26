import { FC } from '../../../common/types/react/fc.type';
import style from './styles.module.scss';
import DefaultUserAvatar from '../../../assets/img/default/user-avatar-default.jpg';
import { useNavigate } from 'react-router-dom';
import { ChannelCrudApiPath } from 'common/enums/enums';

import { getDividedViewsString, getHowLongAgoString } from '../../../helpers/helpers';
import { ReactComponent as WatchIcon } from 'assets/img/watch.svg';
import { ReactComponent as TimeAgoIcon } from 'assets/img/time-ago.svg';
import clsx from 'clsx';

export type VideoProps = {
  id: string;
  poster: string;
  creationDate: Date;
  name: string;
  authorInfo?: {
    author: string;
    authorAvatar?: string;
    channelId: string;
  };
  duration: string | null;
  viewerNum: number | null;
  isLive: boolean;
  className?: string;
};

const VideoCard: FC<VideoProps> = ({
  id,
  poster,
  authorInfo,
  duration,
  name,
  viewerNum,
  creationDate,
  className,
  isLive,
}) => {
  const navigate = useNavigate();
  const redirectToVideoPage = (): void => {
    navigate(`/videos/${id}`);
  };
  const redirectToChannelPage = (): void => {
    navigate(`${ChannelCrudApiPath.ROOT}/${authorInfo?.channelId}`);
  };
  return (
    <div className={clsx(style['video-card'], className)}>
      <div className={style['video-preview-container']} onClick={redirectToVideoPage}>
        <img src={poster} alt="image-poster" height="121" width="262" className={style['video-preview-poster']} />
        <div className={style['video-labels']}>
          {duration !== null && <label className={style['video-duration-label']}>{duration}</label>}
          {isLive && <label className={style['video-live-label']}>LIVE</label>}
        </div>
      </div>
      <div className={style['video-information-container']}>
        {authorInfo && (
          <img
            src={authorInfo.authorAvatar ? authorInfo.authorAvatar : DefaultUserAvatar}
            className={style['video-card-author-avatar']}
            alt="user-avatar"
            height="20"
            width="21"
            onClick={redirectToChannelPage}
          />
        )}
        <div className={style['video-description-container']}>
          <h2 className={style['video-card-title']} onClick={redirectToVideoPage}>
            {name}
          </h2>
          {authorInfo && (
            <h3 className={style['video-card-author-name']} onClick={redirectToChannelPage}>
              {authorInfo.author}
            </h3>
          )}
        </div>
      </div>
      <hr className={style['video-card-hr']} />
      <div className={style['video-card-statistic-container']}>
        {viewerNum !== null && (
          <div className={style['viewer-container']}>
            <WatchIcon width={12} height={12} className={style['icon']} />
            <p className={style['video-card-statistic-data']}>{getDividedViewsString(viewerNum)}</p>
          </div>
        )}
        <div className={style['viewer-container']}>
          <TimeAgoIcon width={12} height={12} className={style['icon']} />
          <p className={style['video-card-statistic-data']}>{getHowLongAgoString(creationDate)}</p>
        </div>
      </div>
    </div>
  );
};

export { VideoCard };
