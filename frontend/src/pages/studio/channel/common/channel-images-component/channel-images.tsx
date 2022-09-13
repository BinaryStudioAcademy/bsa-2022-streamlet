import { FC } from '../../../../../common/types/react/fc.type';
import styles from '../../styles.module.scss';

type ChannelImagesProps = {
  src?: string;
};

const ChannelBanner: FC<ChannelImagesProps> = ({ src }) => {
  if (!src) {
    return (
      <div className={styles['channel-banner-placeholder']}>
        <span className={styles['placeholder-text']}>Place for your banner</span>
      </div>
    );
  }

  return <div className={styles['channel-banner-placeholder']} style={{ backgroundImage: `url("${src}")` }} />;
};

const ChannelAvatar: FC<ChannelImagesProps> = ({ src }) => {
  if (!src || src === '') {
    return <div className={styles['avatar-placeholder']}> </div>;
  }

  return (
    <img
      className={styles['channel-image-preview']}
      width={'96'}
      height={'96'}
      src={src}
      alt="channel avatar preview"
    />
  );
};

export { ChannelAvatar, ChannelBanner };
