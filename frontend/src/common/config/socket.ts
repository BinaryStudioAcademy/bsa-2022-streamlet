import { ENV } from 'common/enums/enums';
import { io } from 'socket.io-client';

const socket = io(`${ENV.SERVER_HOST}${ENV.SERVER_PORT && `:${ENV.SERVER_PORT}`}`, { transports: ['websocket'] });

export { socket };
