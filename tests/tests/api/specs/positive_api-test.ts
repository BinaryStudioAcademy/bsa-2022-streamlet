import { VideosController } from '../lib/controllers/videos.controller';
import { HistoryController } from '../lib/controllers/history.controller';
import { AuthController } from '../lib/controllers/auth.controller';
import { UsersController } from '../lib/controllers/users.controller';
import {
  checkStatusCode,
  checkResponseTime,
  checkSchema,
  checkResponseBodyMessage,
} from '../../helpers/functionsForChecking.helpers';

const auth = new AuthController();
const videos = new VideosController();
const history = new HistoryController();
const users = new UsersController();
import schemas from './data/schemas_testData.json';
import chai from 'chai';
import chaiJsonSchema from 'chai-json-schema';
import { appConfig } from '../config/dev.config';
chai.use(chaiJsonSchema);

describe('Positive tests', () => {
  let accessToken;

  before('Sign in', async () => {
    const response = await auth.signInUser(appConfig.users.defaultUser.email, appConfig.users.defaultUser.password);
    checkStatusCode(response, 200);
    checkResponseTime(response, 3000);
    checkSchema(response, schemas.schema_signIn);
    checkResponseBodyMessage(response, 'You successfully logged in!');
    accessToken = response.body.tokens.accessToken;
  }),
    it('All videos', async () => {
      const response = await videos.getAllVideos();
      checkStatusCode(response, 200);
      checkResponseTime(response, 3000);
      checkSchema(response, schemas.schema_videos);
    }),
    it('User history', async () => {
      const response = await history.userHistory(accessToken);
      checkStatusCode(response, 200);
      checkResponseTime(response, 3000);
    }),
    it('All users', async () => {
      const response = await users.getAllUsers(accessToken);
      checkStatusCode(response, 200);
      checkResponseTime(response, 3000);
      checkSchema(response, schemas.schema_users);
    });
});
