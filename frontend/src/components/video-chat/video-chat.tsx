import { FC } from 'common/types/types';
import { SendMessage } from 'components/common/send-message/send-message';
import { VideoComment } from './video-comment/video-comment';
import { Comment } from 'shared/src/common/types/comment';

import styles from './video-chat.module.scss';

interface VideoChatProps {
  comments: Array<Comment>;
}

const VideoChat: FC<VideoChatProps> = ({ comments }) => {
  return (
    <div className={styles['video-chat-wrapper']}>
      <div className={styles['video-chat']}>
        {comments.map((comment) => (
          <VideoComment key={comment.id} comment={comment} />
        ))}
      </div>
      <SendMessage />
    </div>
  );
};

export { VideoChat };
