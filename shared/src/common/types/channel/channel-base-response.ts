import { VideoBaseResponseDto } from '~/common/types/video/video-base-response';

type ChannelBaseResponse = {
  id: string;
  name: string;
  description: string;
  videos: VideoBaseResponseDto[];
  contactEmail: string;
  bannerImage: string;
  authorId: string;
  isUserSubscribed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export { type ChannelBaseResponse };
