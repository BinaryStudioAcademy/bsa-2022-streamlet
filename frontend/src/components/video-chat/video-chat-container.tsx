import { ChatMessageResponseDto, FC } from 'common/types/types';
import { socket } from 'common/config/config';
import { useEffect, useAppDispatch, useAppSelector } from 'hooks/hooks';
import { chatActions } from 'store/actions';
import { VideoChat } from './video-chat';
import { SendMessageProps } from 'components/common/send-message/send-message';
import { SocketEvents } from 'common/enums/enums';
import { store } from 'store/store';

const videoId = '04ca1a9f-1425-48fc-8c15-f2ee0f8eb2f7';

socket.on(
  SocketEvents.chat.NOTIFY_CHAT_ROOM_DONE,
  ({ data: { message } }: { data: { message: ChatMessageResponseDto } }) => {
    store.dispatch(chatActions.appendMessage(message));
  },
);

const VideoChatContainer: FC = () => {
  const dispatch = useAppDispatch();
  const {
    chat: {
      currentChat: { id, messages },
    },
  } = useAppSelector((state) => ({
    chat: state.chat,
  }));

  const handlerSubmitMessage = (messageText: string): Promise<ChatMessageResponseDto> =>
    dispatch(
      chatActions.sendMessage({
        chatId: id,
        message: { text: messageText },
      }),
    ).unwrap();

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

  return <VideoChat sendMessageProps={sendMessageProps} messages={messages.list} />;
};

export { VideoChatContainer };
