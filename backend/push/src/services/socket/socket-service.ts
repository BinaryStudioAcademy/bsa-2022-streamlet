import { SocketIo } from '~/shared/types/socket/socket-io.type';
import * as http from 'http';
import { createIoInstance } from '~/websockets/io';
import { amqpService } from '../services';
import { AmqpQueue, SocketEvents } from '~/shared/enums/enums';
import { logger } from '~/config/logger';

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
        queue: AmqpQueue.NOTIFY_CHAT_ROOM,
        onMessage: (data) => {
          if (data && this.io) {
            const message = JSON.parse(data.toString('utf-8'));
            logger.info(`Rabbitmq -> ${JSON.stringify(message)}`);
            this.io.emit(SocketEvents.chat.NOTIFY_CHAT_ROOM_DONE, message);
          }
        },
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
