import { FC } from 'common/types/types';
import styles from './styles.module.scss';

type Props = {
  name: string;
};

const VideoTag: FC<Props> = ({ name }) => (
  <div className={styles.container}>
    <div className={styles['video-tag']}>
      <span>{name}</span>
    </div>
  </div>
);

export { VideoTag };
