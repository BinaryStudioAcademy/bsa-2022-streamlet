import { app } from './app';
import { CONFIG } from './config/config';
import * as http from 'http';
import { services } from './services/services';

const { socketService, amqpService } = services;

const server: http.Server = http.createServer(app);
socketService.subscribe(server);
amqpService.connect();

/*eslint-disable */
server.listen(CONFIG.port, async () => {
  console.log(`Server started on ${CONFIG.port}`);
});
/*eslint-enable */
