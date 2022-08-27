import { ChatMessage, FC } from 'common/types/types';
// import { socket } from 'common/config/config';
import { useEffect, useAppDispatch, useAppSelector } from 'hooks/hooks';
import { chatActions } from 'store/actions';
import { VideoChat } from './video-chat';
import { SendMessageProps } from 'components/common/send-message/send-message';

const videoId = '04ca1a9f-1425-48fc-8c15-f2ee0f8eb2f7';

const VideoChatContainer: FC = () => {
  const dispatch = useAppDispatch();
  const {
    chat: {
      currentChat: { data: chat },
    },
  } = useAppSelector((state) => ({
    chat: state.chat,
  }));

  const handlerSubmitMessage = (): void => void 1;

  const handleChooseEmoji = (): void => void 1;

  const sendMessageProps: SendMessageProps = {
    handlerSubmitMessage,
    handleChooseEmoji,
  };

  useEffect(() => {
    dispatch(chatActions.loadChat({ id: videoId }));

    return () => {
      dispatch(chatActions.closeChat());
    };
  }, [dispatch]);

  return (
    <VideoChat
      sendMessageProps={sendMessageProps}
      messages={chat ? chat.initialMessages.list : ([] as ChatMessage[])}
    />
  );
};

export { VideoChatContainer };
