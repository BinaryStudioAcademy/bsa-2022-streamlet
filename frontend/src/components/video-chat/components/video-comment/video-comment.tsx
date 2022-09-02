import clsx from 'clsx';
import { ChatMessageResponseDto, FC } from 'common/types/types';
import { useState, useEffect } from 'hooks/hooks';
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
};

const VideoComment: FC<Props> = ({ message: { text, createdAt, author }, showTimeStamp, messageClassName }) => {
  const [createdAtDate, setCreatedAtDate] = useState(getHowLongAgoString(new Date(createdAt)));

  const updateTimeDelay = getRightUpdateTimeDelay(createdAt);

  useEffect(() => {
    const updateTimeInterval = setInterval(() => {
      setCreatedAtDate(getHowLongAgoString(new Date(createdAt)));
    }, updateTimeDelay);
    return () => clearInterval(updateTimeInterval);
  }, [updateTimeDelay, createdAt]);

  return (
    <div className={clsx(styles['video-comment'], messageClassName)}>
      <div className={styles['main-part-comment']}>
        {author.profile.avatar ? (
          <img className={styles['commentators-avatar']} src={author.profile.avatar} alt={author.username} />
        ) : (
          <div className={styles['default-avatar']}>
            {generateAbbreviatureNameUser(getUserDisplayName({ userName: author.username }))}
          </div>
        )}
        <p className={styles['commentators-name']}>{getUserDisplayName({ userName: author.username })}</p>
        {showTimeStamp && <span className={styles['dispatch-time']}>{createdAtDate}</span>}
      </div>
      <div className={styles['content-part-comment']}>
        <p className={styles['text-comment']}>{text}</p>
      </div>
    </div>
  );
};

export { VideoComment };
