import { Server } from 'socket.io';
import * as http from 'http';
import { SocketIo } from '~/shared/types/socket/socket-io.type';

const createIoInstance = (httpServer: http.Server): SocketIo => {
  return new Server(httpServer);
};

export { createIoInstance };
