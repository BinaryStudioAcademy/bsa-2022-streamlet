import { bootstrapApp } from './app';
import { amqpConnect } from './config/amqp-connection';
import { logger } from './config/logger';
import { amqpService } from './services';

(async () => {
  try {
    bootstrapApp();
    const amqpChannel = await amqpConnect();
    amqpService.connect(amqpChannel);
  } catch (error) {
    logger.error(error, 'Application start error: ');
    process.exit(1);
  }
})();
