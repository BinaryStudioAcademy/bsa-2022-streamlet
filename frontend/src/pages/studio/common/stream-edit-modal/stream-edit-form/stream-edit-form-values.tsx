import { SelectOptions } from 'pages/studio/stream/common/stream-settings-form-values';

export type StreamEditFormValues = {
  name: string;
  description: string;
  tags: (SelectOptions<string> & { __isNew__?: boolean })[];
  categories: SelectOptions<string>[];
  scheduledStreamDate: Date;
};
