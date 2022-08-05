import express from 'express';
import PinoHttp from 'pino-http';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import 'reflect-metadata';

import { handleHttpError } from './primary-adapters/rest/common/http-error-handlers';
import { createDIContainer } from './configuration/di-container';
import { InversifyExpressServer, RoutingConfig } from 'inversify-express-utils';
import { CONFIG } from './configuration/config';
import { logger } from './configuration/logger';

class Application {
  public app: InversifyExpressServer | undefined;

  public async initialize(): Promise<express.Application> {
    const diContainer = await createDIContainer(CONFIG.APP.DI_CONTAINER_MODULES_PATHS);

    const routingConfig = this.getRoutingConfig();

    this.app = new InversifyExpressServer(diContainer, null, routingConfig);

    this.initMiddlewares();

    this.initErrorHandler();

    return this.app.build();
  }

  private initMiddlewares(): void {
    this.app?.setConfig((app) => {
      app.use(helmet());
      app.use(bodyParser.urlencoded({ 'extended': true }));
      app.use(bodyParser.json());
      app.use(PinoHttp({ logger }));
    });
  }

  private initErrorHandler(): void {
    this.app?.setErrorConfig((app) => {
      app.use(handleHttpError);
    });
  }

  private getRoutingConfig(): RoutingConfig {
    return {
      rootPath: CONFIG.API.PREFIX,
    };
  }
}

const application = new Application();

export { application };
