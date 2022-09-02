import { SelectOptions } from 'common/types/types';
import { StreamPrivacy } from 'shared/build';

export type StreamSettingsFormValues = {
  name: string;
  tags: SelectOptions[];
  categories: SelectOptions[];
  description: string;
  scheduledStreamDate: Date;
  privacy: StreamPrivacy;
};

export type StreamInfoFormValues = {
  streamingKey: string;
  streamingServerUrl: string;
  streamUrl: string;
};
