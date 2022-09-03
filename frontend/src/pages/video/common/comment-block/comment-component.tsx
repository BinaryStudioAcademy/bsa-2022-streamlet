import { generateAbbreviatureNameUser, getUserDisplayName } from 'helpers/user';
import { getHowLongAgoString } from 'helpers/helpers';
import { FC } from 'common/types/types';
import { Comment } from 'shared/src/common/types/comment';
import { ReactComponent as ThumbUp } from 'assets/img/thumb-up.svg';
import { ReactComponent as ThumbDown } from 'assets/img/thumb-down.svg';
import { getCommentReactBtnColor } from 'helpers/video/get-react-button-color.helper';

import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector, useNavigate, useParams, useState } from 'hooks/hooks';
import { addVideoCommentReply, getRepliesForComment } from 'store/video-page/actions';
import { AppRoutes } from 'common/enums/enums';
import { VideoPageCommentForm } from '../add-comment-form/add-comment-form';
import { videoPageActions } from 'store/actions';

type Props = {
  comment: Comment;
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
  isReply?: boolean;
};

const VideoComment: FC<Props> = ({ comment, onLike, onDislike, isReply }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isRepliesOpen, setIsRepliesOpen] = useState(false);
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);

  const { data } = useAppSelector((state) => state.videoPage.replies);
  const { videoId: isVideoIdProvided } = useParams();
  const videoId = isVideoIdProvided as string;
  const userAvatar = useAppSelector((state) => state.profile.profileData?.avatar);
  const user = useAppSelector((state) => state.auth.user);

  const replies = data[comment.id];

  const handleLikeReact = (id: string): void => {
    onLike(id);
    dispatch(getRepliesForComment(comment.id));
  };

  const handleDislikeReact = (id: string): void => {
    onDislike(id);
    dispatch(getRepliesForComment(comment.id));
  };

  const getLikes = (num: number): number | string => (num === 0 ? '\u00A0' : num);

  const handleClickShowReplies = async (): Promise<void> => {
    if (!isRepliesOpen) {
      await dispatch(getRepliesForComment(comment.id));
    }

    setIsRepliesOpen(!isRepliesOpen);
  };

  const handleClickReplyComment = (): void => {
    setIsReplyFormOpen(true);
  };

  const handlerCancelForReplyForm = (): void => {
    setIsReplyFormOpen(false);
  };

  const handleSendForm = async (text: string): Promise<void> => {
    if (!user) {
      navigate(AppRoutes.SIGN_IN, { replace: true });
      return;
    }

    await dispatch(addVideoCommentReply({ parentId: comment.id, text, videoId: videoId }));
    await dispatch(videoPageActions.getVideo(videoId));
  };

  return (
    <div className={styles['video-comment']}>
      <div className={styles['main-part-comment']}>
        {comment.avatar && (
          <img className={styles['commentators-avatar']} src={comment.avatar} alt={comment.userName} />
        )}
        {!comment.avatar && (
          <div className={styles['default-avatar']}>{generateAbbreviatureNameUser(getUserDisplayName(comment))}</div>
        )}
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
            onClick={(): void => handleLikeReact(comment.id)}
            className={styles['reaction-button']}
            color={getCommentReactBtnColor(comment.likeNum)}
          />
          <span>{getLikes(comment.likeNum)}</span>
        </div>
        <div className={styles['reaction-container']}>
          <ThumbDown
            height={'20'}
            width={'20'}
            onClick={(): void => handleDislikeReact(comment.id)}
            className={styles['reaction-button']}
            color={getCommentReactBtnColor(comment.dislikeNum)}
          />
          <span> {getLikes(comment.dislikeNum)}</span>
        </div>
        {!isReply && (
          <button onClick={handleClickReplyComment} className={styles['button-open-reply-form']}>
            Reply
          </button>
        )}
      </div>
      {isReplyFormOpen && (
        <div className={styles['wrapper-form-reply']}>
          <VideoPageCommentForm
            avatar={userAvatar}
            onSubmit={handleSendForm}
            className={'form-send-reply'}
            isFormForReply={true}
            handlerCancelForReplyForm={handlerCancelForReplyForm}
          />
        </div>
      )}
      {Boolean(comment.repliesCount) && (
        <button onClick={handleClickShowReplies} className={styles['button-show-replies']}>
          {comment.repliesCount} replies
        </button>
      )}
      {isRepliesOpen && (
        <div style={{ marginLeft: '46px' }}>
          {isRepliesOpen &&
            replies.map((reply) => (
              <VideoComment
                key={reply.id}
                comment={reply}
                onLike={(): void => handleLikeReact(reply.id)}
                onDislike={(): void => handleDislikeReact(reply.id)}
                isReply={true}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export { VideoComment };
