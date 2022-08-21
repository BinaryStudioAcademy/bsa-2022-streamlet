import { mkdir } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { logger } from '~/config/logger';

export class FsService {
  public static async createFolder({ path }: { path: string }): Promise<void> {
    try {
      mkdir(path, { recursive: true });
    } catch (err) {
      logger.error(err);
    }
  }

  public static createFile({ path, filename, content }: { path: string; filename: string; content: string[] }): void {
    const writeStream = createWriteStream(`${path}/${filename}`);
    writeStream.write(content.join('\r\n'));

    writeStream.end();
  }
}
