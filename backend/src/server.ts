import http from 'http';
import { AddressInfo } from 'net';
import { application } from './app';
import { logger } from './configuration/logger';
import { CONFIG } from './configuration/config';

class Server {
  private server: http.Server | undefined;
  private readonly port: number;

  public constructor() {
    this.port = CONFIG.APP.PORT;
  }

  public async run(): Promise<void> {
    try {
      const app = await application.initialize();
      this.server = app.listen(this.port);
      this.server.on('listening', () => {
        const address = this.server?.address() as AddressInfo;
        logger.info(`Application start on port: ${address.port} Environment: ${CONFIG.APP.NODE_ENV}`);
      });

      this.server.on('error', (error: Error) => {
        logger.error(error, 'Server start error: ');
        process.exit(1);
      });
    } catch (error) {
      logger.error(error, 'Application initialization error: ');
    }
  }
}

const server = new Server();
server.run();
