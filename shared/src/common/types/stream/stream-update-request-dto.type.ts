import { StreamPrivacy } from '~/common/enums/enums';
import { TagResponseDto, CategoryResponseDto } from '../types';

type StreamUpdateRequestDto = {
  videoId: string;
  name: string;
  description: string;
  scheduledStreamDate: string;
  tags: TagResponseDto[];
  categories: CategoryResponseDto[];
  privacy: StreamPrivacy;
};

export { type StreamUpdateRequestDto };
