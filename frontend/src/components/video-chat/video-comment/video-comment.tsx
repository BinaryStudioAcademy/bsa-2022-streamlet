import { ChatMessageResponseDto, FC } from 'common/types/types';
import { generateAbbreviatureNameUser, getUserDisplayName } from 'helpers/user';
import { getHowLongAgoString } from 'helpers/helpers';

import styles from './video-comment.module.scss';

type Props = {
  message: ChatMessageResponseDto;
};

const VideoComment: FC<Props> = ({ message: { text, createdAt, author } }) => {
  return (
    <div className={styles['video-comment']}>
      <div className={styles['main-part-comment']}>
        {author.profile.avatar && (
          <img className={styles['commentators-avatar']} src={author.profile.avatar} alt={author.username} />
        )}
        {!author.profile.avatar && (
          <div className={styles['default-avatar']}>
            {generateAbbreviatureNameUser(getUserDisplayName({ username: author.username }))}
          </div>
        )}
        <p className={styles['commentators-name']}>{getUserDisplayName({ username: author.username })}</p>
        <span className={styles['dispatch-time']}>{getHowLongAgoString(new Date(createdAt))}</span>
      </div>
      <div className={styles['content-part-comment']}>
        <p className={styles['text-comment']}>{text}</p>
      </div>
    </div>
  );
};

export { VideoComment };
