import { FC } from 'common/types/types';
import { generateAbbreviatureNameUser, getUserDisplayName } from 'helpers/user';
import { getHowLongAgoString } from 'helpers/helpers';
import { type VideoComment as VideoCommentType } from '../../../common/types/types';

import styles from './video-comment.module.scss';

type Props = {
  comment: VideoCommentType;
};

const VideoComment: FC<Props> = ({ comment }) => {
  const { author } = comment;
  return (
    <div className={styles['video-comment']}>
      <div className={styles['main-part-comment']}>
        {author.avatar && <img className={styles['commentators-avatar']} src={author.avatar} alt={author.username} />}
        {!author.avatar && (
          <div className={styles['default-avatar']}>
            {generateAbbreviatureNameUser(getUserDisplayName({ ...author, userName: author.username }))}
          </div>
        )}
        <p className={styles['commentators-name']}>{getUserDisplayName({ ...author, userName: author.username })}</p>
        <span className={styles['dispatch-time']}>{getHowLongAgoString(comment.createdAt)}</span>
      </div>
      <div className={styles['content-part-comment']}>
        <p className={styles['text-comment']}>{comment.text}</p>
      </div>
    </div>
  );
};
export { VideoComment };
