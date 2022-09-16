import { getFormatDurationString } from 'helpers/helpers';
import React, { FC, ReactNode } from 'react';
import styles from './styles.module.scss';

type DisplayTabProps = {
  label: ReactNode;
  value: ReactNode;
};

const DisplayTab: FC<DisplayTabProps> = ({ label, value }) => {
  return (
    <div className={styles['display-tab-container']}>
      <div className={styles['label']}>{label}:</div>
      <div className={styles['value']}>{value}</div>
    </div>
  );
};

const All: FC = () => {
  const likeCount = 12;
  const dislikeCount = 2;
  const totalViews = 342;
  const currentLiveSubViews = 12;
  const currentLiveUnsubViews = 10;
  const totalChatMessages = 8;
  const durationSec = 287;

  return (
    <div className={styles['container']}>
      <DisplayTab label="Likes" value={likeCount} />
      <DisplayTab label="Disikes" value={dislikeCount} />
      <DisplayTab label="Total views" value={totalViews} />
      <DisplayTab label="Watching (subscribers)" value={currentLiveSubViews} />
      <DisplayTab label="Watching (guests)" value={currentLiveUnsubViews} />
      <DisplayTab label="Total chat messages" value={totalChatMessages} />
      <DisplayTab label="Stream duration" value={getFormatDurationString(durationSec)} />
    </div>
  );
};

export { All };
