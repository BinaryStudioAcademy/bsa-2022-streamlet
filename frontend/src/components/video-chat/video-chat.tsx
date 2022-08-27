import { FC } from 'common/types/types';
import { SendMessage, SendMessageProps } from 'components/common/send-message/send-message';
import { VideoComment } from './video-comment/video-comment';
import { type VideoComment as VideoCommentType } from '../../common/types/types';

import styles from './video-chat.module.scss';

interface VideoChatProps {
  comments: Array<VideoCommentType>;
  sendMessageProps: SendMessageProps;
}

const VideoChat: FC<VideoChatProps> = ({ comments, sendMessageProps }) => {
  return (
    <div className={styles['video-chat-wrapper']}>
      <div className={styles['video-chat']}>
        {comments.map((comment) => (
          <VideoComment key={comment.id} comment={comment} />
        ))}
      </div>
      <SendMessage {...sendMessageProps} />
    </div>
  );
};

export { VideoChat };
