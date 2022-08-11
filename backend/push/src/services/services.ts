import { AmqpService } from './amqp/amqp-service';
import { SocketService } from './socket/socket-service';

export const services = {
  socketService: new SocketService(),
  amqpService: new AmqpService(),
};
