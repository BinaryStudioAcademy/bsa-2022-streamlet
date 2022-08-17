import bcrypt from 'bcrypt';

export async function compareHash(candidate: string, hash: string): Promise<boolean> {
  return bcrypt.compare(candidate, hash);
}
