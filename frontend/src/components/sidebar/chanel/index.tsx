import { FC } from 'common/types/types';
import { SubscribeChanel } from 'components/common/sidebar/sidebar-container';

import styles from '../../common/sidebar/sidebar.module.scss';

interface ChanelProps {
  chanelInfo: SubscribeChanel;
}

const Chanel: FC<ChanelProps> = ({ chanelInfo: chanel }) => {
  return (
    <div key={chanel.id} className={styles['subscription-item']}>
      <div style={{ backgroundImage: `url(${chanel.chanelAvatar})` }} className={styles['chanel-avatar']}></div>
      <p className={styles['chanel-name']}>{chanel.title}</p>
    </div>
  );
};

export { Chanel };
