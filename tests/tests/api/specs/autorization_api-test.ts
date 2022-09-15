import { AuthController } from '../lib/controllers/auth.controller';
import {
  checkStatusCode,
  checkResponseTime,
  checkSchema,
  checkResponseBodyMessage,
} from '../../helpers/functionsForChecking.helpers';

const auth = new AuthController();
import schemas from './data/schemas_testData.json';
import chai from 'chai';
import chaiJsonSchema from 'chai-json-schema';
import { appConfig } from '../config/dev.config';
chai.use(chaiJsonSchema);

describe('Autorization tests', () => {
  let accessToken, refreshToken;
  // let newUser = {
  //   email: "user3@gmail.com",
  //   username: "username3",
  //   password: "qqqqqqqq",
  //   passwordConfirm: "qqqqqqqq"
  // }

  //   it('Registration', async () => {
  //     let response = await auth.signUpUser(newUser);
  //     checkStatusCode(response, 200);
  //     checkResponseTime(response, 3000);
  //     checkResponseBodyMessage(response, 'Thank you! Please, confirm your email to complete registration');
  //   }),
  //   it('Account verification init', async () => {
  //     let response = await auth.accountVerificationInit(newUser.email);
  //     checkStatusCode(response, 200);
  //     checkResponseTime(response, 3000);
  //     checkResponseBodyMessage(response, 'The letter with verification link has been sent to your address!');
  //   }),

  //   it('Account verification confirm', async () => {
  //     let response = await auth.accountVerificationConfirm('eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIwMDE3MjJiYi1jMTBiLTRhMTEtYTViNy0wZjkxNzg3NjBmMzciLCJpYXQiOjE2NjE4Nzc2NjcsImV4cCI6MTY2MTg3OTQ2N30.gP5BXN1pvYBR89cuNynoSbC4Svc3IkqIhAtxMeeEoaE');
  //     checkStatusCode(response, 200);
  //     checkResponseTime(response, 3000);
  //})

  it('Sign in', async () => {
    const response = await auth.signInUser(appConfig.users.defaultUser.email, appConfig.users.defaultUser.password);
    checkStatusCode(response, 200);
    checkResponseTime(response, 3000);
    checkSchema(response, schemas.schema_signIn);
    checkResponseBodyMessage(response, 'You successfully logged in!');
    accessToken = response.body.tokens.accessToken;
    refreshToken = response.body.tokens.refreshToken;
  }),
    it('Refresh tokens', async () => {
      const response = await auth.refreshTokens(refreshToken);
      checkStatusCode(response, 200);
      checkResponseTime(response, 3000);
      checkSchema(response, schemas.schema_refreshToken);
      accessToken = response.body.tokens.accessToken;
      refreshToken = response.body.tokens.refreshToken;
    }),
    it('Restore password init', async () => {
      const response = await auth.restorePasswordInit(appConfig.users.defaultUser.email);
      checkStatusCode(response, 200);
      checkResponseTime(response, 3000);
      checkResponseBodyMessage(response, 'We`ve sent a password reset instructions to your email');
    }),
    //it('Restore password confirm', async () => {
    //  let response = await auth.restorePasswordConfirm('eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIwMDE3MjJiYi1jMTBiLTRhMTEtYTViNy0wZjkxNzg3NjBmMzciLCJpYXQiOjE2NjE4Nzc2NjcsImV4cCI6MTY2MTg3OTQ2N30.gP5BXN1pvYBR89cuNynoSbC4Svc3IkqIhAtxMeeEoaE', '12345678');
    //  checkStatusCode(response, 200);
    //  checkResponseTime(response, 3000);
    //})
    it('Mail test', async () => {
      const response = await auth.mailTest(appConfig.users.defaultUser.email, 'Margo');
      checkStatusCode(response, 200);
      checkResponseTime(response, 3000);
      checkResponseBodyMessage(response, 'The email has been sent!');
    }),
    it('User info', async () => {
      const response = await auth.userInfo(accessToken);
      checkStatusCode(response, 200);
      checkResponseTime(response, 3000);
      checkSchema(response, schemas.schema_userInfo);
    }),
    it('Sign out', async () => {
      const response = await auth.signOut(accessToken);
      checkStatusCode(response, 204);
      checkResponseTime(response, 3000);
    });
});
