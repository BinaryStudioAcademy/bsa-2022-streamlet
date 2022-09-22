import { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';
import clsx from 'clsx';
import { EmojiClickData } from 'emoji-picker-react';
import { FC } from 'common/types/types';
import { IconName } from 'common/enums/enums';
import { useState, useEffect, useRef, useCallback } from 'hooks/hooks';
import { Icon, Emoji } from 'components/common/common';
import { NeedSignInModal } from 'components/common/sign-in-modal/sign-in-modal';
import { messageMaxLength } from 'components/video-chat/config';

import styles from './send-message.module.scss';

export type SendMessageProps = {
  handlerSubmitMessage: (messageText: string) => Promise<void>;
  sendMessageClassName?: string;
  hasUser: boolean;
  isLightTheme: boolean;
  isHide: boolean;
  currentChatStyle: string;
};

const SendMessage: FC<SendMessageProps> = ({
  handlerSubmitMessage,
  sendMessageClassName,
  hasUser,
  isLightTheme,
  isHide,
  currentChatStyle,
}) => {
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);
  const [caretPosition, setCaretPosition] = useState<number[]>([0, 0]);
  const [selectedEmoji, setSelectedEmoji] = useState<EmojiClickData | null>(null);

  const messageInputEl = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length <= messageMaxLength) {
      setMessageText(e.target.value);
      setError(false);
    }
  };

  const handleInputFocus = (): void => {
    setShowSigninModal(true);
  };

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>): void => {
    const { selectionStart, selectionEnd } = e.target;
    const [caretStart, caretEnd] = caretPosition;
    if (Number(selectionStart) !== caretStart || Number(selectionEnd) !== caretEnd) {
      setCaretPosition([Number(selectionStart), Number(selectionEnd)]);
    }
  };

  const handleAddEmoji = useCallback(
    (selectedEmoji: EmojiClickData): void => {
      if (messageText.length > messageMaxLength - 2) {
        setSelectedEmoji(null);
        return;
      }

      const emoji = String.fromCodePoint(...selectedEmoji.unified.split('-').map((u) => Number(`0x${u}`)));
      const deleteTextLength = caretPosition[1] - caretPosition[0];
      const input = messageText.split('');
      input.splice(caretPosition[0], deleteTextLength, emoji);
      setMessageText(input.join(''));

      setCaretPosition(new Array(2).fill(caretPosition[0] + 2));
      setSelectedEmoji(null);
    },
    [messageText, caretPosition],
  );

  const handleSubmitMessage = (): void => {
    if (!loading && messageText.trim()) {
      setLoading(true);
      handlerSubmitMessage(messageText)
        .then(() => {
          setMessageText('');
          setError(false);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
          setTimeout(setError, 1000, false);
        });
    }
  };

  const onHandleKeydownEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'Enter') {
      handleSubmitMessage();
    }
  };

  useEffect(() => {
    if (selectedEmoji) {
      handleAddEmoji(selectedEmoji);
    }
  }, [selectedEmoji, handleAddEmoji]);

  useEffect(() => {
    const [start, end] = caretPosition;
    if (messageInputEl.current) {
      messageInputEl.current.focus();
      messageInputEl.current.setSelectionRange(start, end);
    }
  }, [caretPosition]);

  useEffect(() => {
    if (hasUser) {
      setShowSigninModal(false);
    }

    return () => {
      setMessageText('');
      setCaretPosition([0, 0]);
    };
  }, [hasUser]);

  return (
    <div className={clsx(styles['add-comments'], styles[currentChatStyle], sendMessageClassName)}>
      {showSigninModal ? (
        <NeedSignInModal
          headerText={'Want to chat about something?'}
          mainText={''}
          onClose={(): void => setShowSigninModal(false)}
          className={styles['sign-in-modal']}
        />
      ) : (
        <>
          <input
            value={messageText}
            onChange={handleInputChange}
            onFocus={!hasUser ? handleInputFocus : (): void => void 1}
            onBlur={handleInputBlur}
            onKeyDown={onHandleKeydownEnter}
            ref={messageInputEl}
            className={clsx(styles['input-add-comments'], error && styles['input-error'])}
            type="text"
            placeholder="Say something..."
          />
          <div className={styles['group-buttons-reactions']}>
            <Emoji
              isLightTheme={isLightTheme}
              isHide={isHide}
              setSelectedEmoji={setSelectedEmoji}
              emojiBlockClassName={styles['emoji-block']}
            />
            <div className={styles['send-btn-group']}>
              <div className={styles['message-length-count']}>{`${messageText.length} / ${messageMaxLength}`}</div>
              <button onClick={handleSubmitMessage} className={styles['send-message']} type="submit">
                <Icon name={IconName.SEND_MESSAGE} width="18" height="16" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export { SendMessage };
