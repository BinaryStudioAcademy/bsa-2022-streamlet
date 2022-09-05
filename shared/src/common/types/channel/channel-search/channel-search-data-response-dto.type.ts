import { ChannelInfoSearchDto } from './channel-info-search-dto.type';

type ChannelSearchDataResponseDto = {
  list: ChannelInfoSearchDto[];
  total: number;
};

export { ChannelSearchDataResponseDto };
