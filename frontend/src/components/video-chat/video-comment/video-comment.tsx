import { FC } from 'common/types/types';
import { generateAbbreviatureNameUser } from 'helpers/user';
import { getFullNameUserFromComment } from 'helpers/comment';
import { getHowLongAgoString } from 'helpers/helpers';
import { Comment } from 'shared/src/common/types/comment';

import styles from './video-comment.module.scss';

type Props = {
  comment: Comment;
};

const VideoComment: FC<Props> = ({ comment }) => {
  return (
    <div className={styles['video-comment']}>
      <div className={styles['main-part-comment']}>
        {comment.avatar && (
          <img className={styles['commentators-avatar']} src={comment.avatar} alt={comment.userName} />
        )}
        {!comment.avatar && (
          <div className={styles['default-avatar']}>
            {generateAbbreviatureNameUser(getFullNameUserFromComment(comment))}
          </div>
        )}
        <p className={styles['commentators-name']}>{getFullNameUserFromComment(comment)}</p>
        <span className={styles['dispatch-time']}>{getHowLongAgoString(comment.dateAdded)}</span>
      </div>
      <div className={styles['content-part-comment']}>
        <p className={styles['text-comment']}>{comment.text}</p>
      </div>
    </div>
  );
};

export { VideoComment };
