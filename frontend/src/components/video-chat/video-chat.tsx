import { ChatMessageResponseDto, FC } from 'common/types/types';
import { useRef } from 'hooks/hooks';
import { SendMessage, SendMessageProps } from 'components/common/send-message/send-message';
import { VideoComment } from './video-comment/video-comment';

import styles from './video-chat.module.scss';

interface VideoChatProps {
  messages: ChatMessageResponseDto[];
  sendMessageProps: SendMessageProps;
}

const VideoChat: FC<VideoChatProps> = ({ messages, sendMessageProps }) => {
  const chatEndEl = useRef<HTMLDivElement>(null);

  // const scrollToBottom = (): void => {
  //   chatEndEl.current?.scrollIntoView({ behavior: 'smooth' });
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // },[messages]);

  return (
    <div className={styles['video-chat-wrapper']}>
      <div className={styles['video-chat']}>
        {messages.map((message) => (
          <VideoComment key={message.id} message={message} />
        ))}
        <div ref={chatEndEl}></div>
      </div>
      <SendMessage {...sendMessageProps} />
    </div>
  );
};

export { VideoChat };
