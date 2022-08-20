import { FC } from 'common/types/types';
import { Icon } from '../icon';
import { IconName } from 'common/enums/components';
import { ChangeEvent, useState } from 'react';

import styles from './send-message.module.scss';

export interface SendMessageProps {
  handlerSubmitMessage: () => void;
  handleChooseEmoji: () => void;
}

const SendMessage: FC<SendMessageProps> = ({ handlerSubmitMessage, handleChooseEmoji }) => {
  const [messageText, setMessageText] = useState('');

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    setMessageText(e.target.value);
  }

  return (
    <div className={styles['add-comments']}>
      <input
        value={messageText}
        onChange={handleInputChange}
        className={styles['input-add-comments']}
        type="text"
        placeholder="Add comments"
      />
      <div className={styles['group-buttons-reactions']}>
        <button onClick={handleChooseEmoji} className={styles['choose-emoji']}>
          <Icon name={IconName.EMOJI} />
        </button>
        <button onClick={handlerSubmitMessage} className={styles['send-message']}>
          <Icon name={IconName.SENDMESSAGE} />
        </button>
      </div>
    </div>
  );
};

export { SendMessage };
