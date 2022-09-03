import { VideoReaction } from 'shared/build';
import { BaseCommentReaction } from 'shared/src/common/types/comment';
import { IconColor } from '../../common/enums/enums';
import { UserBaseResponseDto } from 'common/types/types';
import { getTextFormatedViewsString } from 'helpers/helpers';

export const getReactBtnColor = (
  userReaction: VideoReaction | null,
  isLikeBtn: boolean,
): IconColor.VIDEO_REACTIONS_ICON_COLOR | IconColor.GREEN => {
  if (userReaction === null) {
    return IconColor.VIDEO_REACTIONS_ICON_COLOR;
  }
  if (isLikeBtn) {
    return userReaction.isLike ? IconColor.GREEN : IconColor.VIDEO_REACTIONS_ICON_COLOR;
  }
  return !userReaction.isLike ? IconColor.GREEN : IconColor.VIDEO_REACTIONS_ICON_COLOR;
};

export const getCommentReactBtnColor = (isLightTheme: boolean): string => {
  return isLightTheme ? IconColor.VIDEO_REACTIONS_ICON_COLOR : IconColor.WHITE;
};

const getUserReaction = (
  commentReactions: BaseCommentReaction[],
  user: UserBaseResponseDto | null,
): VideoReaction | null => {
  if (!user) {
    return null;
  }
  const reaction = commentReactions.filter((item) => item.userId === user.id);
  return reaction.length === 0 ? null : { isLike: reaction[0].isLike };
};

export const getFillReactBtnColor = (
  commentReactions: BaseCommentReaction[],
  user: UserBaseResponseDto | null,
  isLikeBtn: boolean,
  isLightTheme: boolean,
): string => {
  const color = isLightTheme ? IconColor.VIDEO_REACTIONS_ICON_COLOR : IconColor.WHITE;
  const userReaction = getUserReaction(commentReactions, user);
  if (userReaction === null) {
    return 'none';
  }
  if (isLikeBtn) {
    return userReaction.isLike ? color : 'none';
  }
  return !userReaction.isLike ? color : 'none';
};

export const getLikes = (num: number): number | string => (num === 0 ? '\u00A0' : getTextFormatedViewsString(num));
