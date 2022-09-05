import { bootstrapApp } from './app';
import { amqpConnect } from './config/amqp-connection';
import { logger } from './config/logger';
import { amqpService } from './services';
import Express from 'express';
import bodyParser from 'body-parser';
import * as http from 'http';

const app = Express();

app.use(Express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/healthcheck', (req, res) => {
  res.sendStatus(200);
});

export { app };

const server: http.Server = http.createServer(app);

server.on('error', (error: Error) => {
  logger.error(error, 'Server start error: ');
  process.exit(1);
});
server.listen(5003, async () => {
  logger.info(`Server started on ${5003} PORT`);
  try {
    const amqpConnection = await amqpConnect();
    amqpService.connect(amqpConnection);
    bootstrapApp();
  } catch (err) {
    logger.error(err, 'Amqp connection initialization error: ');
    process.exit(1);
  }
});
