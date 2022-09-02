import { getUserDisplayName } from 'helpers/user';
import { getHowLongAgoString } from 'helpers/helpers';
import { FC } from 'common/types/types';
import { Comment } from 'shared/src/common/types/comment';
import { ReactComponent as ThumbUp } from 'assets/img/thumb-up.svg';
import { ReactComponent as ThumbDown } from 'assets/img/thumb-down.svg';
import { getCommentReactBtnColor } from 'helpers/video/get-react-button-color.helper';

import styles from './styles.module.scss';
import { UserAvatarOrInitials } from 'components/common/user-avatar-or-initials/user-avatar-or-initials';

type Props = {
  comment: Comment;
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
};

const VideoComment: FC<Props> = ({ comment, onLike, onDislike }) => {
  const handleLikeReact = (): void => {
    onLike(comment.id);
  };

  const handleDislikeReact = (): void => {
    onDislike(comment.id);
  };

  const getLikes = (num: number): number | string => (num === 0 ? '\u00A0' : num);

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
      <div className={styles['reaction-block']}>
        <div className={styles['reaction-container']}>
          <ThumbUp
            height={'20'}
            width={'20'}
            onClick={handleLikeReact}
            className={styles['reaction-button']}
            color={getCommentReactBtnColor(comment.likeNum)}
          />
          <span>{getLikes(comment.likeNum)}</span>
        </div>
        <div className={styles['reaction-container']}>
          <ThumbDown
            height={'20'}
            width={'20'}
            onClick={handleDislikeReact}
            className={styles['reaction-button']}
            color={getCommentReactBtnColor(comment.dislikeNum)}
          />
          <span> {getLikes(comment.dislikeNum)}</span>
        </div>
      </div>
    </div>
  );
};

export { VideoComment };
