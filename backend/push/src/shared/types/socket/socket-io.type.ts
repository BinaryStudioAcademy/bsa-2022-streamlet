import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

// eslint-disable-next-line
export type SocketIo = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
