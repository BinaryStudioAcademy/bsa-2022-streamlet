import { SocketIo } from '~/shared/types/socket/socket-io.type';
import * as http from 'http';
import { createIoInstance } from '~/websockets/io';
import { amqpService } from '../services';
import { AmqpQueue } from 'shared/build';
import { logger } from '~/config/logger';

export class SocketService {
  private io: SocketIo | undefined;

  subscribe(httpServer: http.Server): void {
    this.io = createIoInstance(httpServer);
    this.io.on('connection', (socket) => {
      logger.info(`CLient ${socket.id} connected`);
      amqpService.consume({
        queue: AmqpQueue.SOCKET,
        onMessage: (data) => {
          if (data) {
            const message = data.toString('utf-8');
            logger.info(`Rabbitmq -> data: ${message}`);
            socket.emit('say-hello-done', message);
          }
        },
      });

      amqpService.consume({
        queue: AmqpQueue.SOCKET_ALL,
        onMessage: (data) => {
          if (data && this.io) {
            const message = data.toString('utf-8');
            logger.info(`Rabbitmq -> data: ${message}`);
            this.io.emit('say-hello-all-done', message);
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
