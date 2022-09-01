import { ChatMessageResponseDto, FC } from 'common/types/types';
import { AppRoutes, ChatMenuOptions, IconName } from 'common/enums/enums';
import { useCallback, useEffect, useRef, useState } from 'hooks/hooks';
import { Button, Icon } from 'components/common/common';
import { SendMessage, SendMessageProps, VideoComment } from './components/components';
import { allChatMenuOptions, popOutChatParamsString } from './config';

import styles from './video-chat.module.scss';

interface VideoChatProps {
  chatId: string;
  popOut: boolean;
  initialMessages: ChatMessageResponseDto[];
  messages: ChatMessageResponseDto[];
  sendMessageProps: SendMessageProps;
}

const VideoChat: FC<VideoChatProps> = ({ chatId, popOut, initialMessages, messages, sendMessageProps }) => {
  const chatEndEl = useRef<HTMLDivElement>(null);
  const chatViewEl = useRef<HTMLDivElement>(null);
  const chatMenuEl = useRef<HTMLDivElement>(null);

  const [showTimeStamp, setShowTimeStamp] = useState(false);
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [popOutWindow, setPopOutWindow] = useState<Window | null>(null);

  const handleSetShowChatMenu = (): void => setShowChatMenu(!showChatMenu);
  const handleSetShowTimeStamp = (): void => {
    setShowChatMenu(false);
    setShowTimeStamp(!showTimeStamp);
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

  const emptyOnClickHandler = (): void => setShowChatMenu(false);

  const matchChatMenuOptionWithOnClickHandler: Record<ChatMenuOptions, () => void> = {
    [ChatMenuOptions.PARTICIPANTS]: emptyOnClickHandler,
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
        <span>Live chat</span>
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
          <div ref={chatEndEl} />
          {messages.map((message) => (
            <VideoComment key={message.id} message={message} showTimeStamp={showTimeStamp} />
          ))}
          {initialMessages.map((message) => (
            <VideoComment key={message.id} message={message} showTimeStamp={showTimeStamp} />
          ))}
        </div>
      )}
      <SendMessage {...sendMessageProps} />
    </div>
  );
};

export { VideoChat };
