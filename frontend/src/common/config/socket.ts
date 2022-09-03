import { ENV } from 'common/enums/enums';
import { io } from 'socket.io-client';

const socket = io(`${ENV.PUSH_HOST}${ENV.PUSH_PORT && `:${ENV.PUSH_PORT}`}`, { transports: ['websocket'] });

export { socket };
