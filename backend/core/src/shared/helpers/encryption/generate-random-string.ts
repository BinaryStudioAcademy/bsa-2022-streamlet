import crypto from 'crypto';
import { promisify } from 'util';

export const generateRandomString = async (bytes: number): Promise<string> => {
  const randomBytes = await promisify(crypto.randomBytes)(bytes);
  return randomBytes.toString('base64');
};
