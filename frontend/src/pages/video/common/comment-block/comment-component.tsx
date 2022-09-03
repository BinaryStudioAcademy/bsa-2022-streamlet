import { generateAbbreviatureNameUser, getUserDisplayName } from 'helpers/user';
import { getHowLongAgoString } from 'helpers/helpers';
import { FC } from 'common/types/types';
import { Comment } from 'shared/src/common/types/comment';
import { ReactComponent as ThumbUp } from 'assets/img/thumb-up.svg';
import { ReactComponent as ThumbDown } from 'assets/img/thumb-down.svg';
import { getCommentReactBtnColor, getFillReactBtnColor, getLikes } from 'helpers/video/get-react-button-color.helper';
import { useAppSelector, useState } from 'hooks/hooks';
import { NeedSignInModal } from 'components/common/sign-in-modal/sign-in-modal';

import styles from './styles.module.scss';

type Props = {
  comment: Comment;
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
};

const VideoComment: FC<Props> = ({ comment, onLike, onDislike }) => {
  const [isUserNotAuthAndReact, setIsUserNotAuthAndReact] = useState(false);

  const isLightTheme = useAppSelector((store) => store.theme.isLightTheme);

  const user = useAppSelector((state) => {
    return state.auth.user;
  });

  const handleLikeReact = (): void => {
    if (!user) {
      return setIsUserNotAuthAndReact(true);
    }
    onLike(comment.id);
  };

  const handleDislikeReact = (): void => {
    if (!user) {
      return setIsUserNotAuthAndReact(true);
    }
    onDislike(comment.id);
  };

  const { commentReactions } = comment;

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
        <>
          <div className={styles['reaction-container-up']}>
            <ThumbUp
              height={'14'}
              width={'14'}
              onClick={handleLikeReact}
              className={styles['reaction-button']}
              color={getCommentReactBtnColor(isLightTheme)}
              fill={getFillReactBtnColor(commentReactions, user, true, isLightTheme)}
              stroke="currentcolor"
            />
            <span className={styles['like-span-up']}>{getLikes(comment.likeNum)}</span>
          </div>
          <div className={styles['reaction-container-down']}>
            <ThumbDown
              height={'14'}
              width={'14'}
              onClick={handleDislikeReact}
              className={styles['reaction-button']}
              color={getCommentReactBtnColor(isLightTheme)}
              fill={getFillReactBtnColor(commentReactions, user, false, isLightTheme)}
              stroke="currentcolor"
            />
            <span className={styles['like-span-down']}>{getLikes(comment.dislikeNum)}</span>
          </div>
        </>
      </div>
      {isUserNotAuthAndReact && (
        <NeedSignInModal
          headerText={'Like this video?'}
          className={styles['sign-in-modal']}
          mainText={'Sign in so we can take your opinion into account.'}
          onClose={(): void => {
            setIsUserNotAuthAndReact(false);
          }}
        />
      )}
    </div>
  );
};

export { VideoComment };
