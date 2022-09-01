import { ChatMessageResponseDto, FC } from 'common/types/types';
import { socket } from 'common/config/config';
import { useEffect, useAppDispatch, useAppSelector, useCallback } from 'hooks/hooks';
import { chatActions } from 'store/actions';
import { VideoChat } from './video-chat';
import { SendMessageProps } from './components/components';
import { SocketEvents } from 'common/enums/enums';
import { store } from 'store/store';

socket.on(SocketEvents.chat.NEW_MESSAGE_TO_CHAT_ROOM_DONE, (message: ChatMessageResponseDto) => {
  store.dispatch(chatActions.appendMessage(message));
});

socket.on(SocketEvents.chat.UPDATE_CHAT_PARTICIPANTS_DONE, ({ participants }: { participants: string[] }) => {
  store.dispatch(chatActions.updateParticipants(participants));
});

socket.on(SocketEvents.chat.NOTIFY_CHAT_ROOM_CHAT_IS_ENABLED_DONE, (isChatEnabled: boolean) => {
  store.dispatch(chatActions.updateChatStatus(isChatEnabled));
});

type Props = {
  videoId: string;
  popOut: boolean;
};

const VideoChatContainer: FC<Props> = ({ videoId, popOut }) => {
  const dispatch = useAppDispatch();
  const {
    chat: {
      currentChat: { id, initialMessages, messages, participants },
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

  const joinChatRoom = useCallback(async () => {
    if (videoId) {
      await dispatch(chatActions.loadChat({ id: videoId }));
      socket.emit(SocketEvents.chat.JOIN_ROOM, videoId);
    }
  }, [videoId, dispatch]);

  useEffect(() => {
    joinChatRoom();

    return () => {
      dispatch(chatActions.closeChat());
      socket.emit(SocketEvents.chat.LEAVE_ROOM, videoId);
    };
  }, [dispatch, joinChatRoom, videoId]);

  return (
    <VideoChat
      chatId={videoId}
      popOut={popOut}
      initialMessages={initialMessages.list}
      messages={messages.list}
      participants={participants}
      sendMessageProps={sendMessageProps}
    />
  );
};

export { VideoChatContainer };
