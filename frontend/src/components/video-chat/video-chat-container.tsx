import { FC } from 'common/types/types';
import { VideoChat } from './video-chat';
import { comments } from './comments.mock';
import { SendMessageProps } from 'components/common/send-message/send-message';

const VideoChatContainer: FC = () => {
  function handlerSubmitMessage(): void {
    return void 1;
  }

  function handleChooseEmoji(): void {
    return void 1;
  }

  const sendMessageProps: SendMessageProps = {
    handlerSubmitMessage,
    handleChooseEmoji,
  };

  return <VideoChat sendMessageProps={sendMessageProps} comments={comments} />;
};

export { VideoChatContainer };
