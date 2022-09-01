import { getUserDisplayName } from 'helpers/user';
import { getHowLongAgoString } from 'helpers/helpers';
import { FC } from 'common/types/types';
import { Comment } from 'shared/src/common/types/comment';

import styles from './styles.module.scss';
import { UserAvatarOrInitials } from 'components/common/user-avatar-or-initials/user-avatar-or-initials';

type Props = {
  comment: Comment;
};

const VideoComment: FC<Props> = ({ comment }) => {
  return (
    <div className={styles['video-comment']}>
      <div className={styles['main-part-comment']}>
        <UserAvatarOrInitials
          className={styles['commentators-avatar']}
          avatar={comment.avatar}
          userNamingInfo={{ firstName: comment.firstName, lastName: comment.lastName, userName: comment.userName }}
        />
        <p className={styles['commentators-name']}>{getUserDisplayName(comment)}</p>
        <span className={styles['dispatch-time']}>{getHowLongAgoString(comment.dateAdded)}</span>
      </div>
      <div className={styles['content-part-comment']}>
        <p className={styles['text-comment']}>{comment.text}</p>
      </div>
    </div>
  );
};

export { VideoComment };
