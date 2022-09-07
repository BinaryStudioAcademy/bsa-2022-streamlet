import { FC } from 'common/types/types';
import { IconName } from 'common/enums/enums';
import { Icon } from 'components/common/common';
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
      <div className={videoCardStyles['video-card-meta-data']}>
        <Icon name={IconName.WATCH} />
        {views}
      </div>
      <div className={videoCardStyles['video-card-meta-data']}>
        <Icon name={IconName.TIME_AGO} />
        {getHowLongAgoString(new Date(publishedAt))}
      </div>
    </div>
  );
};

export { MetaDataVideo };
