import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  imageLink: string;
};

const BannerSection: FC<Props> = ({ imageLink }) => {
  return (
    <section className={styles['banner-section']}>
      <div className={styles['banner-section-aspect-ratio-container']}>
        <img src={imageLink} alt="channel`s banner" className={styles['banner-img']} />
      </div>
    </section>
  );
};

export { BannerSection };
