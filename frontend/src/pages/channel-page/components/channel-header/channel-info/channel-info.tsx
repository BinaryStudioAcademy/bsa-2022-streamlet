import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  avatarLink: string;
  channelName: string;
  subscribersCount: number;
};

const ChannelInfo: FC<Props> = ({ avatarLink, channelName, subscribersCount }) => {
  return (
    <section className={styles['channel-info']}>
      <h3 className={styles['channel-name']}>{channelName}</h3>
      <div className={styles['channel-avatar-wrapper']}>
        <img src={avatarLink} alt="channel avatar" className={styles['channel-avatar']} />
      </div>
      <p className={styles['subscribers-count']}>{subscribersCount} subscribers</p>
    </section>
  );
};

export { ChannelInfo };
