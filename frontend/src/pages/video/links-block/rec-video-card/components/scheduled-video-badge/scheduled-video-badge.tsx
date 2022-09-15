import { FC } from 'common/types/types';
import { IconName } from 'common/enums/enums';
import { Icon } from 'components/common/common';
import { getFormatScheduledDateAt } from 'helpers/helpers';

import videoCardStyles from '../../styles.module.scss';

type Props = {
  channelName: string;
  isSchedulePassed: boolean;
  scheduledStreamDate: string;
  isLiveIn: string;
  handleClickNotifyBtn: () => void;
};

const ScheduledVideoBadge: FC<Props> = ({
  channelName,
  isSchedulePassed,
  scheduledStreamDate,
  isLiveIn,
  handleClickNotifyBtn,
}) => {
  return (
    <div className={videoCardStyles['video-card-badge-scheduled']}>
      <Icon name={IconName.ONLINE_STREAMING} />
      <div className={videoCardStyles['video-card-badge-scheduled-data']}>
        {isSchedulePassed ? <span>{`Waiting for ${channelName}`}</span> : <span>{`Live ${isLiveIn}`}</span>}
        <span>{getFormatScheduledDateAt(scheduledStreamDate)}</span>
      </div>
      {!isSchedulePassed && (
        <div className={videoCardStyles['video-card-badge-scheduled-btn']} onClick={handleClickNotifyBtn}>
          <Icon name={IconName.BELL_OUTLINE} />
          <span>Notify me</span>
        </div>
      )}
    </div>
  );
};

export { ScheduledVideoBadge };
