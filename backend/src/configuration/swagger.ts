import { CONFIG } from './config';
import swaggerJSDoc from 'swagger-jsdoc';

function initSwagger(): object {
  const options = {
    definition: {
      swagger: '2.0',
      info: {
        title: 'BSA 2022 | Streamlet',
        version: '1.0.0',
        description: 'This is BSA project.',
      },
      host: CONFIG.APP.HOST,
      basePath: CONFIG.API.PREFIX,
      schemes: ['https', 'http'],
    },
    apis: ['./primary-adapters/**/**.js'],
  };

  return swaggerJSDoc(options);
}

const swagger = initSwagger();

export { swagger };
