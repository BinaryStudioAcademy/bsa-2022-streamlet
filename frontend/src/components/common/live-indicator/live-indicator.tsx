import clsx from 'clsx';
import styles from '../video-card-main/styles.module.scss';
import { Icon } from '../icon';
import { IconName } from '../../../common/enums/component/icon-name.enum';
import { FC } from '../../../common/types/react/fc.type';

type Props = {
  wrapperClassName?: string;
};

export const LiveIndicator: FC<Props> = ({ wrapperClassName }) => {
  return (
    <div className={clsx(wrapperClassName, styles['live-label'], styles['video-card-meta-tag'])}>
      <Icon name={IconName.ONLINE_STREAMING_2} />
      <span>Live</span>
    </div>
  );
};
