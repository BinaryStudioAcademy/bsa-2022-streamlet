import { FC } from 'common/types/types';
import { VideoChatContainer } from 'components/video-chat/video-chat-container';

import styles from './video-page.module.scss';

const VideoPageContainer: FC = () => {
  return (
    <div className={styles['video-page']}>
      <div className={styles['video-block']} />
      <div className={styles['chat-block']}>
        <VideoChatContainer />
      </div>
    </div>
  );
};

export { VideoPageContainer };
