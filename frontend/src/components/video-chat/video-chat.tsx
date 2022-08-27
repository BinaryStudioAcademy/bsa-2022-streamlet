import { ChatMessage, FC } from 'common/types/types';
import { SendMessage, SendMessageProps } from 'components/common/send-message/send-message';
import { VideoComment } from './video-comment/video-comment';

import styles from './video-chat.module.scss';

interface VideoChatProps {
  messages: ChatMessage[];
  sendMessageProps: SendMessageProps;
}

const VideoChat: FC<VideoChatProps> = ({ messages, sendMessageProps }) => {
  return (
    <div className={styles['video-chat-wrapper']}>
      <div className={styles['video-chat']}>
        {messages.map((message) => (
          <VideoComment key={message.id} message={message} />
        ))}
      </div>
      <SendMessage {...sendMessageProps} />
    </div>
  );
};

export { VideoChat };
