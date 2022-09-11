import clsx from 'clsx';
import { FC, Comment } from 'common/types/types';
import { AppRoutes, CommentMenuOptions, IconName } from 'common/enums/enums';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useNavigate,
  useParams,
  useRef,
  useState,
} from 'hooks/hooks';
import { Icon, TextWithEmoji } from 'components/common/common';
import { NeedSignInModal } from 'components/common/sign-in-modal/sign-in-modal';
import { UserAvatarOrInitials } from 'components/common/user-avatar-or-initials/user-avatar-or-initials';
import { VideoPageCommentForm } from '../add-comment-form/add-comment-form';
import { getHowLongAgoString, getUserDisplayName } from 'helpers/helpers';
import { getCommentReactBtnColor, getFillReactBtnColor, getLikes } from 'helpers/video/get-react-button-color.helper';
import { addVideoCommentReply, getRepliesForComment } from 'store/video-page/actions';
import { videoPageActions } from 'store/actions';
import { ReactComponent as ThumbUp } from 'assets/img/thumb-up.svg';
import { ReactComponent as ThumbDown } from 'assets/img/thumb-down.svg';
import { allCommentMenuOptions } from './config';

import styles from './styles.module.scss';

type Props = {
  comment: Comment;
  namingInfo: {
    userName: string;
    firstName?: string;
    lastName?: string;
  };
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
  isReply?: boolean;
};

const VideoComment: FC<Props> = ({ comment, onLike, onDislike, isReply, namingInfo }) => {
  const [isUserNotAuthAndReact, setIsUserNotAuthAndReact] = useState(false);

  const isLightTheme = useAppSelector((store) => store.theme.isLightTheme);

  const user = useAppSelector((state) => {
    return state.auth.user;
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isRepliesOpen, setIsRepliesOpen] = useState(false);
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
  const [isCommentMenuOpen, setIsCommentMenuOpen] = useState(false);

  const commentMenuEl = useRef<HTMLDivElement>(null);

  const { data } = useAppSelector((state) => state.videoPage.replies);
  const { videoId: isVideoIdProvided } = useParams();
  const videoId = isVideoIdProvided as string;
  const userAvatar = useAppSelector((state) => state.profile.profileData?.avatar);

  const replies = data[comment.id];

  const handleSetIsCommentMenuOpen = (): void => setIsCommentMenuOpen(!isCommentMenuOpen);

  const handleLikeReact = (id: string): void => {
    if (!user) {
      return setIsUserNotAuthAndReact(true);
    }
    onLike(id);
    dispatch(getRepliesForComment(comment.id));
  };

  const handleDislikeReact = (id: string): void => {
    if (!user) {
      return setIsUserNotAuthAndReact(true);
    }
    onDislike(id);
    dispatch(getRepliesForComment(comment.id));
  };

  const { commentReactions } = comment;

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

  const matchCommentMenuOptionWithOnClickHandler: Record<CommentMenuOptions, () => void> = {
    [CommentMenuOptions.EDIT]: () => void 1,
    [CommentMenuOptions.DELETE]: () => void 1,
  };

  const commentMenuOptions = allCommentMenuOptions.map((option) => ({
    ...option,
    onClick: matchCommentMenuOptionWithOnClickHandler[option.type],
  }));

  const onHandleClickOutsideMenu = useCallback((e: MouseEvent): void => {
    if (!commentMenuEl.current?.contains(e.target as HTMLElement)) {
      setIsCommentMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isCommentMenuOpen) {
      window.addEventListener('click', onHandleClickOutsideMenu);
    }
    return () => {
      window.removeEventListener('click', onHandleClickOutsideMenu);
    };
  }, [isCommentMenuOpen, onHandleClickOutsideMenu]);

  return (
    <div className={styles['video-comment']}>
      <UserAvatarOrInitials
        className={clsx(styles['commentators-avatar'], { [styles['is-reply']]: isReply })}
        avatar={comment.avatar}
        userNamingInfo={{ firstName: comment.firstName, lastName: comment.lastName, userName: comment.userName }}
      />
      <div className={styles['video-comment-body']}>
        <div className={styles['video-comment-body-primary']}>
          <div className={styles['video-comment-primary-wrp']}>
            <div className={styles['main-part-comment']}>
              <p className={clsx({ [styles['is-reply']]: isReply }, styles['commentators-name'])}>
                {getUserDisplayName(comment)}
              </p>
              <span className={styles['dispatch-time']}>{getHowLongAgoString(comment.dateAdded)}</span>
            </div>
            <div className={clsx({ [styles['is-reply']]: isReply }, styles['content-part-comment'])}>
              <TextWithEmoji text={comment.text} textClassName={styles['text-comment']} />
            </div>
            <div className={styles['reaction-block']}>
              <>
                <div className={styles['reaction-container-up']}>
                  <ThumbUp
                    height={'14'}
                    width={'14'}
                    onClick={(): void => handleLikeReact(comment.id)}
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
                    onClick={(): void => handleDislikeReact(comment.id)}
                    className={styles['reaction-button']}
                    color={getCommentReactBtnColor(isLightTheme)}
                    fill={getFillReactBtnColor(commentReactions, user, false, isLightTheme)}
                    stroke="currentcolor"
                  />
                  <span className={styles['like-span-down']}>{getLikes(comment.dislikeNum)}</span>
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
              </>
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
                  isLightTheme={isLightTheme}
                  isFormForReply={true}
                  namingInfo={namingInfo}
                  handlerCancelForReplyForm={handlerCancelForReplyForm}
                />
              </div>
            )}
            {Boolean(comment.repliesCount) && (
              <button
                onClick={handleClickShowReplies}
                className={clsx(styles['button-show-replies'], { [styles['open-replies']]: isRepliesOpen })}
              >
                {comment.repliesCount} replies
              </button>
            )}
          </div>
          <div className={styles['comment-menu']} ref={commentMenuEl}>
            <div
              className={styles['comment-menu-toggle']}
              onClick={handleSetIsCommentMenuOpen}
              style={
                isCommentMenuOpen
                  ? { visibility: 'visible' }
                  : comment.authorId !== user?.id
                  ? { visibility: 'hidden' }
                  : {}
              }
            >
              <Icon name={IconName.DOTS_MENU} height="20px" />
            </div>
            {isCommentMenuOpen && (
              <div className={styles['comment-menu-body']}>
                <ul className={styles['comment-menu-list']}>
                  {commentMenuOptions.map((option) => {
                    return (
                      <li key={option.type}>
                        <div className={styles['comment-menu-item']} onClick={option.onClick}>
                          <Icon name={option.icon} />
                          <span>{option.text}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className={styles['video-comment-body-secondary']}>
          {isRepliesOpen && (
            <div className={styles['replies']}>
              {isRepliesOpen &&
                replies.map((reply) => (
                  <VideoComment
                    key={reply.id}
                    comment={reply}
                    namingInfo={namingInfo}
                    onLike={(): void => handleLikeReact(reply.id)}
                    onDislike={(): void => handleDislikeReact(reply.id)}
                    isReply={true}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { VideoComment };
