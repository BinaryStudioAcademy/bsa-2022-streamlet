import { FC } from 'common/types/types';
import { IconName } from 'common/enums/enums';
import { Icon } from 'components/common/common';
import { getHowLongAgoString } from 'helpers/helpers';

import videoCardStyles from '../../styles.module.scss';

type Props = {
  views: string;
  publishedAt: string;
};

const MetaDataVideo: FC<Props> = ({ views, publishedAt }) => {
  return (
    <div className={videoCardStyles['video-card-meta']}>
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
