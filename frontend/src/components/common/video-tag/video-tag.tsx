import clsx from 'clsx';
import { FC } from 'common/types/types';
import { VideoTagName } from 'common/enums/enums';
import styles from './styles.module.scss';

type Props = {
  name: VideoTagName;
};

const VideoTag: FC<Props> = ({ name }) => (
  <div className={styles.container}>
    <div className={clsx(styles['video-tag'], styles[`video-tag-${name}`])}>
      <span>{name}</span>
    </div>
  </div>
);

export { VideoTag };
