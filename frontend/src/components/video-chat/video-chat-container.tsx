import { ChatMessageResponseDto, FC } from 'common/types/types';
import { socket } from 'common/config/config';
import { useEffect, useAppDispatch, useAppSelector, useCallback } from 'hooks/hooks';
import { chatActions } from 'store/actions';
import { VideoChat } from './video-chat';
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
  popOutSetting: boolean;
};

const VideoChatContainer: FC<Props> = ({ videoId, popOutSetting }) => {
  const dispatch = useAppDispatch();
  const {
    chat: {
      currentChat: { initialMessages, messages, participants, isChatEnabled },
      status,
    },
    user,
    isLightTheme,
  } = useAppSelector((state) => ({
    chat: state.chat,
    user: state.auth.user,
    isLightTheme: state.theme.isLightTheme,
  }));

  const hasUser = Boolean(user);

  const handlerSubmitMessage = (messageText: string): Promise<ChatMessageResponseDto> =>
    dispatch(
      chatActions.sendMessage({
        chatId: videoId,
        message: { text: messageText },
      }),
    ).unwrap();

  const joinChatRoom = useCallback(async () => {
    if (videoId) {
      await dispatch(chatActions.loadChat({ id: videoId }));
      socket.emit(SocketEvents.chat.JOIN_ROOM, videoId);
    }
  }, [videoId, dispatch]);

  const leaveChatRoom = useCallback((): void => {
    dispatch(chatActions.closeChat());
    socket.emit(SocketEvents.chat.LEAVE_ROOM, videoId);
  }, [dispatch, videoId]);

  useEffect(() => {
    joinChatRoom();

    return leaveChatRoom;
  }, [joinChatRoom, leaveChatRoom, status]);

  return (
    <VideoChat
      chatId={videoId}
      hasUser={hasUser}
      isLightTheme={isLightTheme}
      popOutSetting={popOutSetting}
      initialMessages={initialMessages.list}
      messages={messages.list}
      participants={participants}
      chatStatus={status ?? isChatEnabled}
      handlerSubmitMessage={handlerSubmitMessage}
    />
  );
};

export { VideoChatContainer };
