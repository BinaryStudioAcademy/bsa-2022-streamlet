import { FC } from '../../../common/types/react/fc.type';
import style from './styles.module.scss';
import DefaultUserAvatar from '../../../assets/img/default-user-avatar.jpg';
import { useNavigate } from 'react-router-dom';
import { IconName } from 'common/enums/enums';
import { Icon } from '../icon';

import { getHowLongAgoString } from '../../../helpers/helpers';

type Props = {
  id: string;
  chanelId: string;
  poster: string;
  author: string;
  creationDate: Date;
  name: string;
  authorAvatar?: string;
  duration: string;
  viewerNum: number;
};

const VideoCard: FC<Props> = ({
  id,
  poster,
  authorAvatar,
  author,
  duration,
  name,
  viewerNum,
  creationDate,
  chanelId,
}) => {
  const navigate = useNavigate();
  const redirectToVideoPage = (): void => {
    navigate(`video/${id}`, { replace: true });
  };
  const redirectToChanelPage = (): void => {
    navigate(`channel/${chanelId}`, { replace: true });
  };
  const viewerNumStringWithSpace: string = String(viewerNum).replace(/(\d)(?=(\d\d\d)+(\D|$))/g, '$1 ');
  return (
    <div className={style['video-card']}>
      <div className={style['video-preview-container']} onClick={redirectToVideoPage}>
        <img src={poster} alt="image-poster" height="121" width="262" className={style['video-preview-poster']} />
        <label className={style['video-duration-label']}>{duration}</label>
      </div>
      <div className={style['video-information-container']}>
        <img
          src={authorAvatar ? authorAvatar : DefaultUserAvatar}
          className={style['video-card-author-avatar']}
          alt="user-avatar"
          height="20"
          width="21"
          onClick={redirectToChanelPage}
        />
        <div className={style['video-description-container']}>
          <h2 className={style['video-card-title']} onClick={redirectToVideoPage}>
            {name}
          </h2>
          <h3 className={style['video-card-author-name']} onClick={redirectToChanelPage}>
            {author}
          </h3>
        </div>
      </div>
      <hr className={style['video-card-hr']} />
      <div className={style['video-card-statistic-container']}>
        <div className={style['viewer-container']}>
          {Icon({ name: IconName.WATCH, color: '#363C3A', width: '12', height: '12' })}
          <p className={style['video-card-statistic-data']}>{viewerNumStringWithSpace}</p>
        </div>
        <div className={style['viewer-container']}>
          {Icon({ name: IconName.TIMEAGO, color: '#363C3A', width: '12', height: '12' })}
          <p className={style['video-card-statistic-data']}>{getHowLongAgoString(creationDate)}</p>
        </div>
      </div>
    </div>
  );
};

export { VideoCard };
