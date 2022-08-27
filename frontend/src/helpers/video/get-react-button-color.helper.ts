import { VideoReaction } from 'shared/build';
import { IconColor } from '../../common/enums/enums';

export const getReactBtnColor = (
  userReaction: VideoReaction | null,
  isLikeBtn: boolean,
): IconColor.GRAY | IconColor.GREEN => {
  if (userReaction === null) {
    return IconColor.GRAY;
  }
  if (isLikeBtn) {
    return userReaction.isLike ? IconColor.GREEN : IconColor.GRAY;
  }
  return !userReaction.isLike ? IconColor.GREEN : IconColor.GRAY;
};
