import { expect } from 'chai';

export function checkStatusCode(response, statusCode: 200 | 201 | 204 | 400 | 401 | 403 | 404 | 409 | 500): void {
  expect(response.statusCode, `Status code should be ${statusCode}`).to.equal(statusCode);
}

export function checkResponseBodyMessage(response, message: string): void {
  expect(response.body.message, `Message should be ${message}`).to.equal(message);
}

export function checkResponseTime(response, maxResponseTime: number): void {
  expect(response.timings.phases.total, `Response time should be less than ${maxResponseTime}ms`).to.be.lessThan(
    maxResponseTime,
  );
}
export function checkSchema(response, schema: object): void {
  expect(response.body).to.be.jsonSchema(schema);
}

export function checkResponseBodyStatus(response, status: string): void {
  expect(response.body.status, `Status should be ${status}`).to.be.equal(status);
}
