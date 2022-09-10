import clsx from 'clsx';
import { ChatMessageResponseDto, FC } from 'common/types/types';
import { useState, useEffect } from 'hooks/hooks';
import { TextWithEmoji } from 'components/common/common';
import {
  getHowLongAgoString,
  generateAbbreviatureNameUser,
  getUserDisplayName,
  getRightUpdateTimeDelay,
} from 'helpers/helpers';

import styles from './video-comment.module.scss';

type Props = {
  message: ChatMessageResponseDto;
  showTimeStamp: boolean;
  messageClassName?: string;
  currentChatStyle: string;
};

const VideoComment: FC<Props> = ({
  message: { text, createdAt, author },
  showTimeStamp,
  messageClassName,
  currentChatStyle,
}) => {
  const [createdAtDate, setCreatedAtDate] = useState(getHowLongAgoString(new Date(createdAt)));

  const updateTimeDelay = getRightUpdateTimeDelay(createdAt);

  useEffect(() => {
    const updateTimeInterval = setInterval(() => {
      setCreatedAtDate(getHowLongAgoString(new Date(createdAt)));
    }, updateTimeDelay);
    return () => clearInterval(updateTimeInterval);
  }, [updateTimeDelay, createdAt]);

  return (
    <>
      <div className={clsx(styles['chat-message-wrapper'], styles[currentChatStyle])}>
        <div className={clsx(styles['chat-message'], messageClassName)}>
          <div className={styles['chat-message-icon']}>
            {author.profile.avatar ? (
              <img className={styles['author-avatar']} src={author.profile.avatar} alt={author.username} />
            ) : (
              <div className={styles['default-avatar']}>
                {generateAbbreviatureNameUser(getUserDisplayName({ userName: author.username }))}
              </div>
            )}
          </div>
          <div className={styles['chat-message-body']}>
            <div className={styles['chat-message-title']}>
              <span className={styles['author-name']}>{getUserDisplayName({ userName: author.username })}</span>
              {showTimeStamp && <span className={styles['dispatch-time']}>{createdAtDate}</span>}
            </div>
            <div className="chat-message-tex">
              <TextWithEmoji text={text} textClassName={styles['text-comment']} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { VideoComment };
