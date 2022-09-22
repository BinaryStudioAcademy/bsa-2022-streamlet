import { CreateVideoStatDto } from './video';

export type AddVideoViewRequestDto = {
  videoId: string;
  data: Omit<CreateVideoStatDto, 'videoId' | 'view' | 'userId'>;
};

export type AddVideoViewResponseDto = {
  videoId: string;
  currentViews: number;
};
