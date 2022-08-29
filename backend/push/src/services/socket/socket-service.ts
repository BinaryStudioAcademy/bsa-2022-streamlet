import { SocketIo } from '~/shared/types/socket/socket-io.type';
import * as http from 'http';
import { createIoInstance } from '~/websockets/io';
import { amqpService } from '../services';
import { AmqpQueue, SocketEvents } from '~/shared/enums/enums';
import { logger } from '~/config/logger';
import { throttle } from '~/helpers/throttle';

class SocketService {
  private io: SocketIo | undefined;

  subscribe(httpServer: http.Server): void {
    this.io = createIoInstance(httpServer);
    this.io.on('connection', (socket) => {
      logger.info(`CLient ${socket.id} connected`);
      amqpService.consume({
        queue: AmqpQueue.NOTIFY_USER,
        onMessage: (data) => {
          if (data) {
            const message = JSON.parse(data.toString('utf-8'));
            logger.info(`Rabbitmq -> ${JSON.stringify(message)}`);
            socket.emit(SocketEvents.notify.NOTIFY_USER_DONE, message);
          }
        },
      });

      amqpService.consume({
        queue: AmqpQueue.NOTIFY_USER_BROADCAST,
        onMessage: (data) => {
          if (data && this.io) {
            const message = JSON.parse(data.toString('utf-8'));
            logger.info(`Rabbitmq -> ${JSON.stringify(message)}`);
            this.io.emit(SocketEvents.notify.NOTIFY_BROADCAST_DONE, message);
          }
        },
      });

      amqpService.consume({
        queue: AmqpQueue.NEW_MESSAGE_TO_CHAT_ROOM,
        onMessage: (data) => {
          if (data && this.io) {
            const {
              data: { roomId, message },
            } = JSON.parse(data.toString('utf-8'));
            logger.info(`Rabbitmq -> ${JSON.stringify(message)}`);
            this.io.to(roomId).emit(SocketEvents.chat.NEW_MESSAGE_TO_CHAT_ROOM_DONE, message);
          }
        },
      });

      const updateLiveViews = throttle((roomId: string) => {
        if (this.io) {
          const countIsLive = this.io.sockets.adapter.rooms.get(roomId)?.size;
          this.io.to(roomId).emit(SocketEvents.video.UPDATE_LIVE_VIEWS_DONE, { live: countIsLive });
        }
      }, 2000);

      socket.on(SocketEvents.chat.JOIN_ROOM, (roomId: string) => {
        socket.join(roomId);
        socket.emit(SocketEvents.chat.JOIN_ROOM_DONE, 'success');

        updateLiveViews(roomId);
      });

      socket.on(SocketEvents.chat.LEAVE_ROOM, (roomId: string) => {
        socket.leave(roomId);
        socket.emit(SocketEvents.chat.LEAVE_ROOM_DONE, 'success');

        updateLiveViews(roomId);
      });

      socket.on('disconnect', async () => {
        logger.info(`${socket.id} connection lost`);
      });

      socket.on('manual-disconnection', async () => {
        logger.warn(`${socket.id} disconnected`);
      });

      socket.on('say-hello', ({ message }: { message: string }) => {
        logger.info(`message from client ${socket.id} -> ${message}`);
        socket.emit('say-hello-done', { message: 'hi' });
      });
    });
    this.io.on('connect_failed', () => {
      logger.error('Connection failed');
    });

    this.io.on('error', () => {
      logger.error('Some error');
    });
  }
}

export const socketService = new SocketService();
