import { ENV } from 'common/enums/enums';
import { io } from 'socket.io-client';

const socket = io(`${ENV.SERVER_HOST}${ENV.PUSH_PORT && `:${ENV.PUSH_PORT}`}`, { transports: ['websocket'] });

export { socket };
