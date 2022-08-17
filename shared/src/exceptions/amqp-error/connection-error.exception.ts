const DEFAULT_SERVER_ERROR = 'Amqp Connection failed';

class AmqpConnectionError extends Error {
  constructor({ message = DEFAULT_SERVER_ERROR } = {}) {
    super(message);
    this.message = message;
  }
}

export { AmqpConnectionError };
