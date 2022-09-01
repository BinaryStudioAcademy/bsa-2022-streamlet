import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import clsx from 'clsx';
import { ChatMessageResponseDto, FC } from 'common/types/types';
import { IconName } from 'common/enums/enums';
import { Icon } from 'components/common/icon';

import styles from './send-message.module.scss';

export type SendMessageProps = {
  handlerSubmitMessage: (messageText: string) => Promise<ChatMessageResponseDto>;
  handleChooseEmoji: () => void;
};

const SendMessage: FC<SendMessageProps> = ({ handlerSubmitMessage, handleChooseEmoji }) => {
  const [messageText, setMessageText] = useState('');
  const [error, setError] = useState(false);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    setMessageText(e.target.value);
    setError(false);
  }

  const handleSubmitMessage = (): void => {
    handlerSubmitMessage(messageText)
      .then(() => {
        setMessageText('');
        setError(false);
      })
      .catch(() => {
        setError(true);
      });
  };

  const handleClickSubmit = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    handleSubmitMessage();
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleSubmitMessage();
  };

  return (
    <form className={styles['add-comments']} onSubmit={handleSubmitForm}>
      <input
        value={messageText}
        onChange={handleInputChange}
        className={clsx(styles['input-add-comments'], error && styles['input-error'])}
        type="text"
        placeholder="Add comments"
      />
      <div className={styles['group-buttons-reactions']}>
        <button onClick={handleChooseEmoji} className={styles['choose-emoji']}>
          <Icon name={IconName.EMOJI} width="28" height="28" />
        </button>
        <button onClick={handleClickSubmit} className={styles['send-message']}>
          <Icon name={IconName.SEND_MESSAGE} width="18" height="16" />
        </button>
      </div>
    </form>
  );
};

export { SendMessage };
