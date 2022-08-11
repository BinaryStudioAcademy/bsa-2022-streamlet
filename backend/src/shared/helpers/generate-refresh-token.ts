import crypto from 'crypto';
import { promisify } from 'util';

// TODO: move to config
const REFRESH_TOKEN_LENGTH_BYTES = 64;

export const generateRefreshToken = async (): Promise<string> => {
  const randomString = (await promisify(crypto.randomBytes)(REFRESH_TOKEN_LENGTH_BYTES)).toString('base64');
  return randomString;
};
