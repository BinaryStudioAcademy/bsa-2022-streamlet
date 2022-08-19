import { bootstrapApp } from './app';
import { amqpConnect } from './config/amqp-connection';
import { logger } from './config/logger';
import { amqpService } from './services';

(async (): Promise<void> => {
  try {
    const amqpChannel = await amqpConnect();
    amqpService.connect(amqpChannel);
    bootstrapApp();
  } catch (error) {
    logger.error(error, 'Application start error: ');
    process.exit(1);
  }
})();
