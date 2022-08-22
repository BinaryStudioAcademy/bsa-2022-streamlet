import { FC, ChannelSubscriptionResponseDto } from 'common/types/types';

import styles from './channel.module.scss';

interface ChannelProps {
  channelInfo: ChannelSubscriptionResponseDto;
}

const Channel: FC<ChannelProps> = ({ channelInfo: channel }) => {
  return (
    <div key={channel.id} className={styles['subscription-item']}>
      <img src={channel.channelAvatar} alt={channel.title} className={styles['channel-avatar']} />
      <p className={styles['channel-name']}>{channel.title}</p>
    </div>
  );
};

export { Channel };
