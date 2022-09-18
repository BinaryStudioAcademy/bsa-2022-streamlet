import chai from 'chai';
import chaiJsonSchema from 'chai-json-schema';

chai.use(chaiJsonSchema);

const { expect } = chai;

export function checkStatusCode(response, statusCode: 200 | 201 | 204 | 400 | 401 | 403 | 404 | 409 | 500) {
  expect(response.statusCode, `Status code should be ${statusCode}`).to.equal(statusCode);
}

export function checkResponseBodyMessage(response, message: string) {
  expect(response.body.message, `Message should be ${message}`).to.equal(message);
}

export function checkResponseTime(response, maxResponseTime: number) {
  expect(response.timings.phases.total, `Response time should be less than ${maxResponseTime}ms`).to.be.lessThan(
    maxResponseTime,
  );
}
export function checkSchema(response, schema: object) {
  expect(response.body).to.be.jsonSchema(schema);
}

export function checkResponseBodyStatus(response, status: string) {
  expect(response.body.status, `Status should be ${status}`).to.be.equal(status);
}
