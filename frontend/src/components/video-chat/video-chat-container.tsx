import { ChatMessageResponseDto, FC, StatsData } from 'common/types/types';
import { socket } from 'common/config/config';
import { useEffect, useAppDispatch, useAppSelector, useCallback } from 'hooks/hooks';
import { chatActions, statsActions } from 'store/actions';
import { VideoChat } from './video-chat';
import { ChatStyle, SocketEvents } from 'common/enums/enums';
import { store } from 'store/store';
import { defaultChatSettings } from './config';

socket.on(SocketEvents.chat.NEW_MESSAGE_TO_CHAT_ROOM_DONE, (message: ChatMessageResponseDto) => {
  store.dispatch(chatActions.appendMessage(message));
});

socket.on(SocketEvents.chat.UPDATE_CHAT_PARTICIPANTS_DONE, ({ participants }: { participants: string[] }) => {
  store.dispatch(chatActions.updateParticipants(participants));
});

socket.on(SocketEvents.chat.NOTIFY_CHAT_ROOM_CHAT_IS_ENABLED_DONE, (isChatEnabled: boolean) => {
  store.dispatch(chatActions.updateChatStatus(isChatEnabled));
});

export type ChatSetting = {
  popOutSetting?: boolean;
  hideSetting?: boolean;
};

type Props = {
  videoId: string;
  chatSettings?: ChatSetting | undefined;
  chatStyle?: ChatStyle;
  heightVideoBlock?: number;
  handleHideChat?: (param: boolean) => void;
  statsData?: StatsData;
};

const VideoChatContainer: FC<Props> = ({
  videoId,
  chatStyle,
  chatSettings,
  heightVideoBlock,
  handleHideChat,
  statsData,
}) => {
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

  const handlerSubmitMessage = (messageText: string): Promise<void> =>
    dispatch(
      chatActions.sendMessage({
        chatId: videoId,
        message: { text: messageText },
      }),
    )
      .unwrap()
      .then(() => {
        if (statsData) {
          dispatch(
            statsActions.updateVideoStat({
              statId: statsData.statId,
              data: {
                videoId: statsData.videoId,
                chatsActivity: 1,
              },
            }),
          );
        }
      });

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
      chatSettings={{ ...defaultChatSettings, ...chatSettings }}
      initialMessages={initialMessages.list}
      messages={messages.list}
      participants={participants}
      chatStatus={status ?? isChatEnabled}
      handlerSubmitMessage={handlerSubmitMessage}
      chatStyle={chatStyle}
      heightVideoBlock={heightVideoBlock}
      handleHideChat={handleHideChat}
      statsData={statsData}
    />
  );
};

export { VideoChatContainer };
