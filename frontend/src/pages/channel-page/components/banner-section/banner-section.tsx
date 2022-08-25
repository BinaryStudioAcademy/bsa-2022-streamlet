import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  imageLink: string;
};

const BannerSection: FC<Props> = ({ imageLink }) => {
  return (
    <section className={styles['banner-section']}>
      <img src={imageLink} alt="channel`s banner" className={styles['banner-img']} />
    </section>
  );
};

export { BannerSection };
