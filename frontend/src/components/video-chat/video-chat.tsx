import { UIEvent } from 'react';
import clsx from 'clsx';
import { ChatMessageResponseDto, FC, StatsData } from 'common/types/types';
import { AppRoutes, ChatMenuOptions, ChatStyle, IconName } from 'common/enums/enums';
import { useCallback, useEffect, useRef, useState } from 'hooks/hooks';
import { Button, Icon } from 'components/common/common';
import { Participant, SendMessage, SendMessageProps, VideoComment } from './components/components';
import { ChatSetting } from './video-chat-container';
import { debounce } from 'helpers/common/debounce.helper';
import { allChatMenuOptions, matchChatStyleWithChatStyleClassName, popOutChatParamsString } from './config';

import styles from './video-chat.module.scss';

interface VideoChatProps {
  chatId: string;
  hasUser: boolean;
  isLightTheme: boolean;
  chatSettings: ChatSetting;
  initialMessages: ChatMessageResponseDto[];
  messages: ChatMessageResponseDto[];
  participants: string[];
  chatStatus: boolean;
  handlerSubmitMessage: SendMessageProps['handlerSubmitMessage'];
  chatStyle?: ChatStyle;
  heightVideoBlock?: number;
  handleHideChat?: (param: boolean) => void;
  statsData?: StatsData;
}

const VideoChat: FC<VideoChatProps> = ({
  chatId,
  hasUser,
  isLightTheme,
  chatSettings: { popOutSetting, hideSetting },
  initialMessages,
  messages,
  participants,
  chatStatus,
  handlerSubmitMessage,
  chatStyle,
  heightVideoBlock,
  handleHideChat,
}) => {
  const chatEndEl = useRef<HTMLDivElement>(null);
  const chatViewEl = useRef<HTMLDivElement>(null);
  const chatMenuEl = useRef<HTMLDivElement>(null);

  const [showTimeStamp, setShowTimeStamp] = useState(false);
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [popOutWindow, setPopOutWindow] = useState<Window | null>(null);
  const [showChatDownBtn, setShowChatDownBtn] = useState(false);
  const [hideWelcome, setHideWelcome] = useState(false);
  const [hideChat, setHideChat] = useState(false);

  const currentChatStyle = matchChatStyleWithChatStyleClassName[chatStyle ?? ChatStyle.DEFAULT];

  const handleSetShowChatMenu = (): void => setShowChatMenu(!showChatMenu);

  const handleSetShowTimeStamp = (): void => {
    setShowTimeStamp(!showTimeStamp);
    setShowChatMenu(false);
  };
  const handleSetShowParticipants = (): void => {
    setShowParticipants(!showParticipants);
    setShowChatMenu(false);
  };

  const popInChat = (): void => {
    popOutWindow?.close();
    setPopOutWindow(null);
  };

  const popOutChat = (): void => {
    const popOut = window.open(`${AppRoutes.LIVE_CHAT}?v=${chatId}`, 'Live chat', popOutChatParamsString);
    setPopOutWindow(popOut);
    setShowChatMenu(false);

    const timer = setInterval(() => {
      if (!popOut) {
        clearInterval(timer);
      } else {
        if (popOut.closed) {
          clearInterval(timer);
          popInChat();
        }
      }
    }, 2000);
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

  const handleChatScroll = (e: UIEvent<HTMLDivElement>): void => {
    const target = e.target as EventTarget & HTMLDivElement;
    if (target.scrollTop < -100) {
      setShowChatDownBtn(true);
    } else {
      setShowChatDownBtn(false);
    }
  };

  const debouncedHandleChatScroll = debounce(handleChatScroll, 500);

  const handleClickGoDownBtn = (): void => {
    if (chatViewEl.current) {
      chatViewEl.current.scrollTop = 0;
    }
  };

  const handleSetHideChat = (): void => {
    setHideChat(!hideChat);
    if (handleHideChat) {
      handleHideChat(hideChat);
    }
    setTimeout(handleClickGoDownBtn, 1000);
  };

  useEffect(() => {
    if (showChatMenu) {
      window.addEventListener('click', onHandleClickOutsideMenu);
    }
    return () => {
      window.removeEventListener('click', onHandleClickOutsideMenu);
    };
  }, [showChatMenu, onHandleClickOutsideMenu]);

  if (!chatStatus) {
    return (
      <div
        className={clsx(
          styles['video-chat-wrapper'],
          styles[currentChatStyle],
          styles['chat-disabled'],
          hideChat && styles['hide-chat'],
        )}
        style={heightVideoBlock ? { height: heightVideoBlock } : {}}
      >
        <div className={styles['video-chat-popout']}>
          <span>Chat is disabled for this live stream.</span>
        </div>
        {hideSetting && (
          <div className={styles['video-chat-footer-bar']} onClick={handleSetHideChat}>
            <span>{hideChat ? 'show chat' : 'hide chat'}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={clsx(styles['video-chat-wrapper'], styles[currentChatStyle], hideChat && styles['hide-chat'])}>
      {!popOutWindow && (
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
                    if (!popOutSetting && option.type === ChatMenuOptions.POP_OUT_CHAT) {
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
      )}
      {popOutWindow && !popOutWindow.closed ? (
        <>
          <div className={styles['video-chat-popout']}>
            <span>Nothing to see here.</span>
            <span>We popped out.</span>
            <Button content="Restore chat" className={styles['video-chat-restore-btn']} onClick={popInChat} />
          </div>
        </>
      ) : (
        <div
          className={clsx(styles['video-chat'], showParticipants && styles['view-participants'])}
          onScroll={debouncedHandleChatScroll}
          ref={chatViewEl}
        >
          {showParticipants ? (
            participants.map((participantId) => <Participant key={participantId} id={participantId} />)
          ) : (
            <>
              <div ref={chatEndEl} />
              {messages.map((message) => (
                <VideoComment
                  key={message.id}
                  message={message}
                  showTimeStamp={showTimeStamp}
                  messageClassName={styles['video-chat-message']}
                  currentChatStyle={currentChatStyle}
                />
              ))}
              {!hideWelcome && (
                <div className={styles['video-chat-welcome-message']}>
                  <div className={styles['video-chat-welcome-message-icon']}>
                    <Icon name={IconName.MAIN_LOGO} />
                  </div>
                  <div className={styles['video-chat-welcome-message-body']}>
                    <span>
                      Welcome to live chat! Remember to guard your privacy and abide by our Community Guidelines.
                    </span>
                  </div>
                  <Icon
                    name={IconName.X_MARK}
                    className={styles['video-chat-welcome-message-close']}
                    onClick={(): void => setHideWelcome(true)}
                  />
                </div>
              )}
              {initialMessages.map((message) => (
                <VideoComment
                  key={message.id}
                  message={message}
                  showTimeStamp={showTimeStamp}
                  messageClassName={styles['video-chat-message']}
                  currentChatStyle={currentChatStyle}
                />
              ))}
            </>
          )}
        </div>
      )}
      <div className={styles['video-chat-footer']}>
        <div
          className={clsx(styles['video-chat-down-btn'], showChatDownBtn && styles['show-btn'])}
          onClick={handleClickGoDownBtn}
        >
          <div className={styles['video-chat-down-btn-icon']}>
            <Icon name={IconName.ARROW_DOWN_2} />
          </div>
        </div>
        <SendMessage
          hasUser={hasUser}
          isLightTheme={isLightTheme}
          isHide={hideChat}
          sendMessageClassName={styles['video-chat-send-form']}
          handlerSubmitMessage={handlerSubmitMessage}
          currentChatStyle={currentChatStyle}
        />
      </div>
      {hideSetting && (
        <div className={styles['video-chat-footer-bar']} onClick={handleSetHideChat}>
          <span>{hideChat ? 'show chat' : 'hide chat'}</span>
        </div>
      )}
    </div>
  );
};

export { VideoChat };
