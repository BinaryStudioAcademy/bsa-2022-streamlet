import { FC } from 'common/types/types';
import { VideoChat } from './video-chat';
import { SendMessageProps } from 'components/common/send-message/send-message';
import { VideoComment } from 'shared/build/common/types/video/video-coment';

type Props = {
  comments: VideoComment[];
};

const VideoChatContainer: FC<Props> = ({ comments }) => {
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
