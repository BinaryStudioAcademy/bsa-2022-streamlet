import { VideoInfoDto, VideoPrivacy, VideoStatus } from 'shared/build';
import { VideoWithReactionsAndComments } from '~/shared/types/types';

export const castToVideoInfoDto = ({
  id,
  poster,
  name,
  description,
  comments,
  status,
  privacy,
  publishedAt,
  reactions,
  videoViews,
  duration,
}: VideoWithReactionsAndComments): VideoInfoDto => {
  return {
    id,
    poster,
    name,
    description,
    status: status as VideoStatus,
    privacy: privacy as VideoPrivacy,
    publishedAt: publishedAt?.toISOString().substring(0, 10).split('-').join(' ') || '',
    duration,
    viewsCount: videoViews,
    commentsCount: comments.length,
    likeCount: reactions.filter((reaction) => reaction.isLike).length,
    dislikeCount: reactions.filter((reaction) => !reaction.isLike).length,
  };
};
