import { ChatMessageResponseDto, FC } from 'common/types/types';
import { useRef } from 'hooks/hooks';
import { SendMessage, SendMessageProps } from 'components/common/send-message/send-message';
import { VideoComment } from './video-comment/video-comment';

import styles from './video-chat.module.scss';

interface VideoChatProps {
  initialMessages: ChatMessageResponseDto[];
  messages: ChatMessageResponseDto[];
  sendMessageProps: SendMessageProps;
}

const VideoChat: FC<VideoChatProps> = ({ initialMessages, messages, sendMessageProps }) => {
  const chatEndEl = useRef<HTMLDivElement>(null);
  const chatViewEl = useRef<HTMLDivElement>(null);

  return (
    <div className={styles['video-chat-wrapper']}>
      <div className={styles['video-chat']} ref={chatViewEl}>
        <div ref={chatEndEl}></div>
        {messages.map((message) => (
          <VideoComment key={message.id} message={message} />
        ))}
        {initialMessages.map((message) => (
          <VideoComment key={message.id} message={message} />
        ))}
      </div>
      <SendMessage {...sendMessageProps} />
    </div>
  );
};

export { VideoChat };
