import { FC } from 'common/types/types';
import styles from './styles.module.scss';
import { Comment } from 'shared/src/common/types/comment';
import { VideoComment } from './comment-component';
import { VideoPageCommentForm } from '../add-comment-form/add-comment-form';

type Props = {
  onNewComment: { (text: string): void };
  userAvatar: string | undefined;
  namingInfo: {
    userName: string;
    firstName?: string;
    lastName?: string;
  };
  comments: Comment[];
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
};

const VideoCommentBlock: FC<Props> = ({ comments, userAvatar, onNewComment, onLike, onDislike, namingInfo }) => {
  return (
    <>
      <VideoPageCommentForm
        avatar={userAvatar}
        onSubmit={onNewComment}
        className={styles['comment-form']}
        namingInfo={namingInfo}
      />
      {comments.map((comment: Comment) => {
        return <VideoComment key={comment.id} comment={comment} onLike={onLike} onDislike={onDislike} />;
      })}
    </>
  );
};

export { VideoCommentBlock };
