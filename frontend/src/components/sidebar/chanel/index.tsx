import { FC, SubscribeChanel } from 'common/types/types';

import styles from './chanel.module.scss';

interface ChanelProps {
  chanelInfo: SubscribeChanel;
}

const Chanel: FC<ChanelProps> = ({ chanelInfo: chanel }) => {
  return (
    <div key={chanel.id} className={styles['subscription-item']}>
      <img src={chanel.chanelAvatar} alt={chanel.title} className={styles['chanel-avatar']} />
      <p className={styles['chanel-name']}>{chanel.title}</p>
    </div>
  );
};

export { Chanel };
