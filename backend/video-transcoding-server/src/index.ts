import { logger } from './config/logger';
import Express from 'express';
import bodyParser from 'body-parser';
import * as http from 'http';
import { AmqpService } from '~/services/amqp/amqp-service';
import { StreamingService } from '~/services/stream/streaming-service';

const app = Express();

app.use(Express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/healthcheck', (req, res) => {
  res.sendStatus(200);
});

const server: http.Server = http.createServer(app);

server.on('error', (error: Error) => {
  logger.error(error, 'Server start error: ');
  process.exit(1);
});

server.listen(5003, async () => {
  logger.info(`Server started on ${5003} PORT`);
  try {
    const amqpService = new AmqpService();
    await amqpService.connect();

    const streamingService = new StreamingService(amqpService);
    await streamingService.initConsumers();
  } catch (err) {
    logger.error(err, 'Amqp connection initialization error: ');
    process.exit(1);
  }
});
