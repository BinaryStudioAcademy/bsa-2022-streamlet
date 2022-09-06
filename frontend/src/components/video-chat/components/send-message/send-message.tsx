import { ChangeEvent, FormEvent } from 'react';
import clsx from 'clsx';
import { ChatMessageResponseDto, FC } from 'common/types/types';
import { IconName } from 'common/enums/enums';
import { useState, useEffect } from 'hooks/hooks';
import { Icon } from 'components/common/icon';

import styles from './send-message.module.scss';
import { NeedSignInModal } from 'components/common/sign-in-modal/sign-in-modal';

export type SendMessageProps = {
  handlerSubmitMessage: (messageText: string) => Promise<ChatMessageResponseDto>;
  handleChooseEmoji: () => void;
  sendMessageClassName?: string;
  hasUser: boolean;
};

const SendMessage: FC<SendMessageProps> = ({
  handlerSubmitMessage,
  handleChooseEmoji,
  sendMessageClassName,
  hasUser,
}) => {
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target.value.length <= 200) {
      setMessageText(e.target.value);
      setError(false);
    }
  }

  const handleInputFocus = (): void => {
    setShowSigninModal(true);
  };

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

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleSubmitMessage();
  };

  useEffect(() => {
    if (hasUser) {
      setShowSigninModal(false);
    }
  }, [hasUser]);

  return (
    <form className={clsx(styles['add-comments'], sendMessageClassName)} onSubmit={handleSubmitForm}>
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
            className={clsx(styles['input-add-comments'], error && styles['input-error'])}
            type="text"
            placeholder="Say something..."
          />
          <div className={styles['group-buttons-reactions']}>
            <button onClick={handleChooseEmoji} className={styles['choose-emoji']} type="button">
              <Icon name={IconName.EMOJI} width="25" height="25" />
            </button>
            <div className={styles['send-btn-group']}>
              <div className={styles['message-length-count']}>{`${messageText.length} / 200`}</div>
              <button onClick={handleSubmitMessage} className={styles['send-message']} type="button">
                <Icon name={IconName.SEND_MESSAGE} width="18" height="16" />
              </button>
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export { SendMessage };
