import clsx from 'clsx';
import { FC } from 'common/types/types';
import { IconName } from 'common/enums/enums';
import { Icon } from 'components/common/common';

import videoCardStyles from '../../styles.module.scss';

type Props = {
  scheduledStreamDateFor: string;
  handleClickNotifyBtn: () => void;
};

const MetaDataWait: FC<Props> = ({ scheduledStreamDateFor, handleClickNotifyBtn }) => {
  return (
    <div className={clsx(videoCardStyles['video-card-meta'], videoCardStyles['video-card-meta-scheduled'])}>
      <div className={videoCardStyles['video-card-meta-data']}>
        <span>{`Scheduled for ${scheduledStreamDateFor}`}</span>
      </div>
      <div className={videoCardStyles['video-card-meta-data']}>
        <div className={videoCardStyles['video-card-meta-data-scheduled']} onClick={handleClickNotifyBtn}>
          <Icon name={IconName.BELL_OUTLINE} />
          <span>Notify me</span>
        </div>
      </div>
    </div>
  );
};

export { MetaDataWait };
