import { ChangeEvent, FormEvent } from 'react';
import clsx from 'clsx';
import { ChatMessageResponseDto, FC } from 'common/types/types';
import { IconName } from 'common/enums/enums';
import { useState } from 'hooks/hooks';
import { Icon } from 'components/common/icon';

import styles from './send-message.module.scss';

export type SendMessageProps = {
  handlerSubmitMessage: (messageText: string) => Promise<ChatMessageResponseDto>;
  handleChooseEmoji: () => void;
  sendMessageClassName?: string;
};

const SendMessage: FC<SendMessageProps> = ({ handlerSubmitMessage, handleChooseEmoji, sendMessageClassName }) => {
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    setMessageText(e.target.value);
    setError(false);
  }

  const handleSubmitMessage = (): void => {
    if (!loading) {
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
        });
    }
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleSubmitMessage();
  };

  return (
    <form className={clsx(styles['add-comments'], sendMessageClassName)} onSubmit={handleSubmitForm}>
      <input
        value={messageText}
        onChange={handleInputChange}
        className={clsx(styles['input-add-comments'], error && styles['input-error'])}
        type="text"
        placeholder="Say something..."
      />
      <div className={styles['group-buttons-reactions']}>
        <button onClick={handleChooseEmoji} className={styles['choose-emoji']} type="button">
          <Icon name={IconName.EMOJI} width="28" height="28" />
        </button>
        <button onClick={handleSubmitMessage} className={styles['send-message']} type="button">
          <Icon name={IconName.SEND_MESSAGE} width="18" height="16" />
        </button>
      </div>
    </form>
  );
};

export { SendMessage };