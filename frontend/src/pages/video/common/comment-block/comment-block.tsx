import { FC, Comment, StatsData } from 'common/types/types';
import styles from './styles.module.scss';
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
  isLightTheme: boolean;
  comments: Comment[];
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
  handlerCancelForReplyForm: () => void;
  statsData?: StatsData;
};

const VideoCommentBlock: FC<Props> = ({
  comments,
  userAvatar,
  onNewComment,
  onLike,
  onDislike,
  isLightTheme,
  namingInfo,
  handlerCancelForReplyForm,
  statsData,
}) => {
  return (
    <>
      <VideoPageCommentForm
        avatar={userAvatar}
        onSubmit={onNewComment}
        isLightTheme={isLightTheme}
        className={styles['comment-form']}
        namingInfo={namingInfo}
        handlerCancelForReplyForm={handlerCancelForReplyForm}
      />
      {comments.map((comment: Comment) => {
        return (
          <VideoComment
            key={comment.id}
            comment={comment}
            namingInfo={namingInfo}
            onLike={onLike}
            onDislike={onDislike}
            statsData={statsData}
          />
        );
      })}
    </>
  );
};

export { VideoCommentBlock };
