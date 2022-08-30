import { VideoReaction } from 'shared/build';
import { IconColor } from '../../common/enums/enums';

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
