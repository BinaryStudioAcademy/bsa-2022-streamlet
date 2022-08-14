import { app } from './app';
import { CONFIG } from './config/config';
import * as http from 'http';
import { amqpService, socketService } from './services/services';
import { logger } from './config/logger';
import { amqpConnect } from './config/amqp-connection';

const server: http.Server = http.createServer(app);
socketService.subscribe(server);

server.on('error', (error: Error) => {
  logger.error(error, 'Server start error: ');
  process.exit(1);
});
server.listen(CONFIG.port, async () => {
  logger.info(`Server started on ${CONFIG.port} PORT`);
  try {
    amqpService.connect(await amqpConnect());
  } catch (err) {
    logger.error(err, 'Application initialization error: ');
    process.exit(1);
  }
});
