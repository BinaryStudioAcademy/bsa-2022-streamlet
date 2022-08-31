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
import { expect } from 'chai';

const auth = new AuthController();
const videos = new VideosController();
const history = new HistoryController();
const users = new UsersController();
const schemas = require('./data/schemas_testData.json');
let chai = require('chai');
chai.use(require('chai-json-schema'));

describe('Positive tests', () => {
  let accessToken;

  before('Sign in', async () => {
    let response = await auth.signInUser(global.appConfig.users.Margo.email, global.appConfig.users.Margo.password);
    checkStatusCode(response, 200);
    checkResponseTime(response, 3000);
    checkSchema(response, schemas.schema_signIn);
    checkResponseBodyMessage(response, 'You successfully logged in!');
    accessToken = response.body.tokens.accessToken;
  }),
    it('All videos', async () => {
      let response = await videos.getAllVideos();
      checkStatusCode(response, 200);
      checkResponseTime(response, 3000);
      checkSchema(response, schemas.schema_videos);
    }),
    it('User history', async () => {
      let response = await history.userHistory(accessToken);
      checkStatusCode(response, 200);
      checkResponseTime(response, 3000);
    }),
    it('All users', async () => {
      let response = await users.getAllUsers(accessToken);
      checkStatusCode(response, 200);
      checkResponseTime(response, 3000);
      checkSchema(response, schemas.schema_users);
    });
});
