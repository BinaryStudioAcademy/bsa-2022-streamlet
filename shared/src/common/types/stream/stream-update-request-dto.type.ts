import { StreamPrivacy } from '~/common/enums/enums';
import { TagCreateRequestDto, CategoryCreateRequestDto } from '../types';

type StreamUpdateRequestDto = {
  videoId: string;
  name: string;
  description: string;
  scheduledStreamDate: Date;
  tags: TagCreateRequestDto[];
  categories: CategoryCreateRequestDto[];
  privacy: StreamPrivacy;
};

export { type StreamUpdateRequestDto };
