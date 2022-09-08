import { StreamPrivacy } from 'shared/build';

export const STREAMING_SERVER_URL = 'rtmp://dev.streamlet.tk:1935/live';

export const STREAM_PRIVACY_OPTIONS = [
  { value: StreamPrivacy.PRIVATE, label: 'Private' },
  { value: StreamPrivacy.UNLISTED, label: 'Unlisted' },
  { value: StreamPrivacy.PUBLIC, label: 'Public' },
];
