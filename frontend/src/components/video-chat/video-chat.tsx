import { ChatMessageResponseDto, FC } from 'common/types/types';
import { AppRoutes, ChatMenuOptions, IconName } from 'common/enums/enums';
import { useCallback, useEffect, useRef, useState } from 'hooks/hooks';
import { Button, Icon } from 'components/common/common';
import { Participant, SendMessage, SendMessageProps, VideoComment } from './components/components';
import { allChatMenuOptions, popOutChatParamsString } from './config';

import styles from './video-chat.module.scss';

interface VideoChatProps {
  chatId: string;
  popOut: boolean;
  initialMessages: ChatMessageResponseDto[];
  messages: ChatMessageResponseDto[];
  participants: string[];
  sendMessageProps: SendMessageProps;
}

const VideoChat: FC<VideoChatProps> = ({
  chatId,
  popOut,
  initialMessages,
  messages,
  participants,
  sendMessageProps,
}) => {
  const chatEndEl = useRef<HTMLDivElement>(null);
  const chatViewEl = useRef<HTMLDivElement>(null);
  const chatMenuEl = useRef<HTMLDivElement>(null);

  const [showTimeStamp, setShowTimeStamp] = useState(false);
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [popOutWindow, setPopOutWindow] = useState<Window | null>(null);

  const handleSetShowChatMenu = (): void => setShowChatMenu(!showChatMenu);
  const handleSetShowTimeStamp = (): void => {
    setShowTimeStamp(!showTimeStamp);
    setShowChatMenu(false);
  };
  const handleSetShowParticipants = (): void => {
    setShowParticipants(!showParticipants);
    setShowChatMenu(false);
  };

  const popOutChat = (): void => {
    const popOut = window.open(`${AppRoutes.LIVE_CHAT}?v=${chatId}`, 'Live chat', popOutChatParamsString);
    if (popOut) {
      popOut.onload = (): void => {
        popOut.onbeforeunload = (): void => {
          popOut.opener.console.log('pop-in');
        };
      };
    }
    setPopOutWindow(popOut);
    setShowChatMenu(false);
  };

  const popInChat = (): void => {
    popOutWindow?.close();
    setPopOutWindow(null);
  };

  const matchChatMenuOptionWithOnClickHandler: Record<ChatMenuOptions, () => void> = {
    [ChatMenuOptions.PARTICIPANTS]: handleSetShowParticipants,
    [ChatMenuOptions.POP_OUT_CHAT]: popOutChat,
    [ChatMenuOptions.TOGGLE_TIMESTAMPS]: handleSetShowTimeStamp,
  };

  const chatMenuOptions = allChatMenuOptions.map((option) => ({
    ...option,
    onClick: matchChatMenuOptionWithOnClickHandler[option.type],
  }));

  const onHandleClickOutsideMenu = useCallback((e: MouseEvent): void => {
    if (!chatMenuEl.current?.contains(e.target as HTMLElement)) {
      setShowChatMenu(false);
    }
  }, []);

  useEffect(() => {
    if (showChatMenu) {
      window.addEventListener('click', onHandleClickOutsideMenu);
    }
    return () => {
      window.removeEventListener('click', onHandleClickOutsideMenu);
    };
  }, [showChatMenu, onHandleClickOutsideMenu]);

  return (
    <div className={styles['video-chat-wrapper']}>
      <div className={styles['video-chat-header']}>
        <div className={styles['video-chat-header-title']}>
          {showParticipants ? (
            <>
              <div className={styles['video-chat-header-back-btn']} onClick={handleSetShowParticipants}>
                <Icon name={IconName.ARROW_LEFT} />
              </div>
              <span>Participants</span>
            </>
          ) : (
            <span>Live chat</span>
          )}
        </div>
        <div className={styles['video-chat-header-menu']} ref={chatMenuEl}>
          <div className={styles['video-chat-header-menu-toggle']} onClick={handleSetShowChatMenu}>
            <Icon name={IconName.DOTS_MENU} height="20px" />
          </div>
          {showChatMenu && (
            <div className={styles['video-chat-header-menu-body']}>
              <ul className={styles['video-chat-header-menu-list']}>
                {chatMenuOptions.map((option) => {
                  if (!popOut && option.type === ChatMenuOptions.POP_OUT_CHAT) {
                    return null;
                  }
                  return (
                    <li key={option.type}>
                      <div className={styles['video-chat-header-menu-item']} onClick={option.onClick}>
                        <Icon name={option.icon} />
                        <span>{option.text}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
      {popOutWindow && !popOutWindow.closed ? (
        <>
          <div className={styles['video-chat-popout']}>
            <span>Nothing to see here.</span>
            <span>We popped out.</span>
            <Button content="Restore chat" className={styles['video-chat-restore-btn']} onClick={popInChat} />
          </div>
        </>
      ) : (
        <div className={styles['video-chat']} ref={chatViewEl}>
          {showParticipants ? (
            participants.map((user) => <Participant key={user} user={{ id: user }} />)
          ) : (
            <>
              <div ref={chatEndEl} />
              {messages.map((message) => (
                <VideoComment key={message.id} message={message} showTimeStamp={showTimeStamp} />
              ))}
              <div className={styles['video-chat-welcome-message']}>
                <div className={styles['video-chat-welcome-message-icon']}>
                  <Icon name={IconName.MAIN_LOGO} />
                </div>
                <div className={styles['video-chat-welcome-message-body']}>
                  <span>
                    Welcome to live chat! Remember to guard your privacy and abide by our Community Guidelines.
                  </span>
                </div>
              </div>
              {initialMessages.map((message) => (
                <VideoComment key={message.id} message={message} showTimeStamp={showTimeStamp} />
              ))}
            </>
          )}
        </div>
      )}
      <SendMessage {...sendMessageProps} />
    </div>
  );
};

export { VideoChat };
