import { FC } from 'common/types/types';
import { getHowLongAgoString } from 'helpers/helpers';

import videoCardStyles from '../../styles.module.scss';
import clsx from 'clsx';

type Props = {
  views: string;
  publishedAt: string;
  className?: string;
};

const MetaDataVideo: FC<Props> = ({ views, publishedAt, className }) => {
  return (
    <div className={clsx(videoCardStyles['video-card-meta'], className)}>
      <div className={videoCardStyles['video-card-meta-data']}>{views} views</div>
      &bull;
      <div className={videoCardStyles['video-card-meta-data']}>{getHowLongAgoString(new Date(publishedAt))}</div>
    </div>
  );
};

export { MetaDataVideo };
