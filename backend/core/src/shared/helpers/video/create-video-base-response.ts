import { VideoBaseResponseDto } from 'shared/build';
import { createBaseVideoResponse } from '~/shared/helpers/video/types/create-base-vide-response-input.type';
import { createVideoCommentResponse } from '~/shared/helpers/video/crete-comment-response';

const createVideoBaseResponse = (input: createBaseVideoResponse): VideoBaseResponseDto | null => {
  const { video, likeNum, dislikeNum, isUserSubscribeOnVideoChannel } = input;
  if (!video) {
    return null;
  }
  const trimmedVideoComment = createVideoCommentResponse(video.comments);

  const userReaction = video.reactions.length ? video.reactions[0] : null;
  return {
    ...video,
    likeNum,
    dislikeNum,
    userReaction,
    isUserSubscribeOnVideoChannel,
    comments: trimmedVideoComment,
  };
};

export { createVideoBaseResponse };
