import { FC } from '../../../common/types/react/fc.type';
import style from './styles.module.scss';
import DefaultUserAvatar from '../../../assets/img/default-user-avatar.jpg';
import { useNavigate } from 'react-router-dom';
import { IconName } from 'common/enums/enums';
import { Icon } from '../icon';

import { getHowLongAgoString } from '../../../helpers/helpers';
import clsx from 'clsx';

type Props = {
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
  viewerNum: number;
  className?: string;
};

const VideoCard: FC<Props> = ({ id, poster, authorInfo, duration, name, viewerNum, creationDate, className }) => {
  const navigate = useNavigate();
  const redirectToVideoPage = (): void => {
    navigate(`video/${id}`, { replace: true });
  };
  const redirectToChannelPage = (): void => {
    navigate(`channel/${authorInfo?.channelId}`, { replace: true });
  };
  const viewerNumStringWithSpace: string = String(viewerNum).replace(/(\d)(?=(\d\d\d)+(\D|$))/g, '$1 ');
  return (
    <div className={clsx(style['video-card'], className)}>
      <div className={style['video-preview-container']} onClick={redirectToVideoPage}>
        <img src={poster} alt="image-poster" height="121" width="262" className={style['video-preview-poster']} />
        {duration !== null && <label className={style['video-duration-label']}>{duration}</label>}
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
        <div className={style['viewer-container']}>
          {Icon({ name: IconName.WATCH, color: '#363C3A', width: '12', height: '12' })}
          <p className={style['video-card-statistic-data']}>{viewerNumStringWithSpace}</p>
        </div>
        <div className={style['viewer-container']}>
          {Icon({ name: IconName.TIME_AGO, color: '#363C3A', width: '12', height: '12' })}
          <p className={style['video-card-statistic-data']}>{getHowLongAgoString(creationDate)}</p>
        </div>
      </div>
    </div>
  );
};

export { VideoCard };
