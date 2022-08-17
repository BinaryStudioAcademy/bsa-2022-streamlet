import { FC } from 'common/types/types';
import { Icon } from '../icon';
import { IconName } from 'common/enums/components';

import styles from './send-message.module.scss';

const SendMessage: FC = () => {
  return (
    <div className={styles['add-comments']}>
      <input className={styles['input-add-comments']} type="text" placeholder="Add comments" />
      <div className={styles['group-buttons-reactions']}>
        <button className={styles['choose-emoji']}>
          <Icon name={IconName.EMOJI} />
        </button>
        <button className={styles['send-message']}>
          <Icon name={IconName.SENDMESSAGE} />
        </button>
      </div>
    </div>
  );
};

export { SendMessage };
