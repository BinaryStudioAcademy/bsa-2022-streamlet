import { FC } from 'common/types/types';
import { Comment } from 'shared/src/common/types/comment';

import styles from './video-comment.module.scss';

type Props = {
  comment: Comment;
};

const VideoComment: FC<Props> = ({ comment }) => {
  return (
    <div className={styles['video-comment']}>
      <div className={styles['main-part-comment']}>
        <img className={styles['commentators-avatar']} src={comment.avatar} alt={comment.name} />
        <p className={styles['commentators-name']}>{comment.name}</p>
        <span className={styles['dispatch-time']}>{comment.dateAdded}</span>
      </div>
      <div className={styles['content-part-comment']}>
        <p className={styles['text-comment']}>{comment.text}</p>
      </div>
    </div>
  );
};

export { VideoComment };
