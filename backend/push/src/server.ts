import { app } from './app';
import { CONFIG } from './config/config';
import * as http from 'http';
import { amqpService, socketService } from './services/services';
import { logger } from './config/logger';

const server: http.Server = http.createServer(app);
socketService.subscribe(server);
amqpService.connect();

server.listen(CONFIG.port, () => {
  logger.info(`Server started on ${CONFIG.port} PORT`);
});
