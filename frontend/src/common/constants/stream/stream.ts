import { ENV } from 'common/enums/enums';
import { StreamPrivacy } from 'shared/build';

export const STREAMING_SERVER_URL = `rtmp://${ENV.SERVER_HOST}/live`;

export const STREAM_PRIVACY_OPTIONS = [
  { value: StreamPrivacy.PRIVATE, label: 'Private' },
  { value: StreamPrivacy.UNLISTED, label: 'Unlisted' },
  { value: StreamPrivacy.PUBLIC, label: 'Public' },
];
