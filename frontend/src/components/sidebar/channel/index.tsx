import { AppRoutes } from 'common/enums/enums';
import { FC, BaseSubscriptionResponseDto } from 'common/types/types';
import { Link } from 'react-router-dom';

import styles from './channel.module.scss';
import defaultChannelAvatar from 'assets/img/default-channel-avatar.jpg';

interface ChannelProps {
  channelInfo: BaseSubscriptionResponseDto['channel'];
}

const Channel: FC<ChannelProps> = ({ channelInfo: { id, name, avatar } }) => {
  return (
    <Link to={`${AppRoutes.CHANNEL}/${id}`} className={styles['subscription-item']} title={name}>
      <img src={avatar ? avatar : defaultChannelAvatar} alt={name} className={styles['channel-avatar']} />
      <p className={styles['channel-name']}>{name}</p>
    </Link>
  );
};

export { Channel };
