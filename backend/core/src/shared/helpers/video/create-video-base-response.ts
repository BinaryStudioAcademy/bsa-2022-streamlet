import { VideoBaseResponseDto } from 'shared/build';
import { createBaseVideoResponse } from '~/shared/helpers/video/types/create-base-vide-response-input.type';

const createVideoBaseResponse = (input: createBaseVideoResponse): VideoBaseResponseDto | null => {
  const { video, likeNum, disLikeNum, isUserSubscribeOnVideoChannel } = input;
  if (!video) {
    return null;
  }
  const trimmedVideoComment = video.comments.map((comment) => {
    const { profile } = comment.author;
    if (!profile) {
      return {
        ...comment,
        author: {
          username: 'anonimus',
        },
      };
    }
    const { avatar, firstName, lastName } = profile;
    return {
      ...comment,
      author: {
        avatar,
        firstName,
        username: 'anonimus',
        lastName,
      },
    };
  });

  const userReaction = video.reactions.length ? video.reactions[0] : null;
  return {
    ...video,
    likeNum,
    disLikeNum,
    userReaction,
    isUserSubscribeOnVideoChannel,
    comments: trimmedVideoComment,
  };
};

export { createVideoBaseResponse };
