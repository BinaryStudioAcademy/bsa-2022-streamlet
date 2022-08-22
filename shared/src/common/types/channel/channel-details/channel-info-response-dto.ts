export type ChannelInfoResponseDto = {
  id: string;
  name: string;
  description: string;
  contactEmail: string;
  bannerImage: string;
  avatar: string;
  subscribersCount: number;
  authorInfo: ChannelAuthorPreviewInfo;
};

type ChannelAuthorPreviewInfo = {
  id: string;
  username: string;
};
