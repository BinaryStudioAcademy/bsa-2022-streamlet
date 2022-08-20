import { FC } from 'common/types/types';
import { VideoChat } from './video-chat';
import { SendMessageProps } from 'components/common/send-message/send-message';
import { type VideoComment } from '../../common/types/types';

type Props = {
  comments: VideoComment[];
  handlerSubmitMessage(text: string): void;
};

const VideoChatContainer: FC<Props> = ({ comments, handlerSubmitMessage }) => {
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
