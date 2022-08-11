import crypto from 'crypto';
import { promisify } from 'util';
import { CONFIG } from '~/configuration/config';

const REFRESH_TOKEN_LENGTH_BYTES = CONFIG.ENCRYPTION.REFRESH_TOKEN_BYTES;

export const generateRefreshToken = async (): Promise<string> => {
  const randomString = (await promisify(crypto.randomBytes)(REFRESH_TOKEN_LENGTH_BYTES)).toString('base64');
  return randomString;
};
