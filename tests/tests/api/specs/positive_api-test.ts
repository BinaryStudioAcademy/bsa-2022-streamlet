import { VideosController } from '../lib/controllers/videos.controller';
import { HistoryController } from '../lib/controllers/history.controller';
import { AuthController } from '../lib/controllers/auth.controller';
import { UsersController } from '../lib/controllers/users.controller';
import {
  checkResponseBodyMessage,
  checkResponseTime,
  checkSchema,
  checkStatusCode,
} from '../../helpers/functionsForChecking.helpers';
const schemas = require('./data/schemas_testData.json');
const chai = require('chai');
import { CONFIG } from '../../config/config';

chai.use(require('chai-json-schema'));

const auth = new AuthController();
const videos = new VideosController();
const history = new HistoryController();
const users = new UsersController();

describe('Positive tests', () => {
  let accessToken;

  before('Sign in', async () => {
    const response = await auth.signInUser(CONFIG.USER_EMAIL, CONFIG.USER_PASSWORD);
    checkStatusCode(response, 200);
    checkResponseTime(response, 3000);
    checkSchema(response, schemas.schema_signIn);
    checkResponseBodyMessage(response, 'You successfully logged in!');
    accessToken = response.body.tokens.accessToken;
  });

  it('All videos', async () => {
    const response = await videos.getAllVideos();
    checkStatusCode(response, 200);
    checkResponseTime(response, 3000);
    checkSchema(response, schemas.schema_videos);
  });

  it('User history', async () => {
    const response = await history.userHistory(accessToken);
    checkStatusCode(response, 200);
    checkResponseTime(response, 3000);
  });

  it('All users', async () => {
    const response = await users.getAllUsers(accessToken);
    checkStatusCode(response, 200);
    checkResponseTime(response, 3000);
    checkSchema(response, schemas.schema_users);
  });
});
