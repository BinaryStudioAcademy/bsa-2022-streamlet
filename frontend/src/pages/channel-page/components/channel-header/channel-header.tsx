import { useAppSelector } from 'hooks/hooks';
import React, { FC } from 'react';
import { ChannelInfo } from './channel-info/channel-info';
import styles from './styles.module.scss';
import { Subscribe } from './subscribe/subscribe';

const ChannelHeader: FC = () => {
  const channelInfo = useAppSelector((state) => {
    const data = state.channelPage.currentChannel.data;
    return data
      ? {
          avatar: data.avatar,
          name: data.name,
          subscribersCount: data.subscribersCount,
        }
      : data;
  });
  if (!channelInfo) {
    return null;
  }
  return (
    <section className={styles['channel-header']}>
      <ChannelInfo
        avatarLink={channelInfo.avatar}
        channelName={channelInfo.name}
        subscribersCount={channelInfo.subscribersCount}
      />
      <Subscribe className={styles['subscribe']} />
    </section>
  );
};

export { ChannelHeader };
