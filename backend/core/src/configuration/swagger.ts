import { CONFIG } from './config';
import swaggerJSDoc from 'swagger-jsdoc';

function initSwagger(): object {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'BSA 2022 | Streamlet',
        version: '1.0.0',
        description: 'This is BSA project.',
      },
      servers: [
        { url: `https://${CONFIG.APP.HOST}${CONFIG.API.PREFIX}` },
        { url: `http://${CONFIG.APP.HOST}${CONFIG.API.PREFIX}` },
      ],
    },
    apis: ['./build/primary-adapters/**/**.js'],
  };

  return swaggerJSDoc(options);
}

const swagger = initSwagger();

export { swagger };
