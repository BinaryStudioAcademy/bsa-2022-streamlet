import { VideoPrivacy, VideoStatus } from '~/common/enums/enums';

export type VideoInfoDto = {
  id: string;
  poster: string;
  name: string;
  description: string;
  commentsCount: number;
  status: VideoStatus;
  privacy: VideoPrivacy;
  publishedAt: string;
  likeCount: number;
  dislikeCount: number;
  viewsCount: number;
  duration: number;
};
