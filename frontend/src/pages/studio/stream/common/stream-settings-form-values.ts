import { StreamPrivacy } from 'shared/build';

export type SelectOptions<T> = {
  value: T;
  label: string;
};

export type StreamSettingsFormValues = {
  name: string;
  tags: SelectOptions<string>[];
  categories: SelectOptions<string>[];
  description: string;
  scheduledStreamDate: Date;
  privacy: StreamPrivacy;
};

export type StreamInfoFormValues = {
  streamingKey: string;
  streamingServerUrl: string;
  streamUrl: string;
};
