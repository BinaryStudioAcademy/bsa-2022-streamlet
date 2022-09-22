import { AppRoutes } from 'common/enums/enums';
import { FC, BaseSubscriptionResponseDto } from 'common/types/types';
import { Link } from 'react-router-dom';

import styles from './channel.module.scss';
import { UserAvatarOrInitials } from 'components/common/user-avatar-or-initials/user-avatar-or-initials';

interface ChannelProps {
  channelInfo: BaseSubscriptionResponseDto['channel'];
}

const Channel: FC<ChannelProps> = ({ channelInfo: { id, name, avatar } }) => {
  return (
    <Link to={`${AppRoutes.CHANNEL}/${id}`} className={styles['subscription-item']} title={name}>
      <UserAvatarOrInitials
        className={styles['channel-avatar']}
        avatar={avatar}
        userNamingInfo={{ userName: name ?? '' }}
      />
      <p className={styles['channel-name']}>{name}</p>
    </Link>
  );
};

export { Channel };
