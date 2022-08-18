import fs from 'fs';

export class FsService {
  public static createFolder({ path }: { path: string }): void {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  }

  public static createFile({ path, filename, content }: { path: string; filename: string; content: string[] }): void {
    const writeStream = fs.createWriteStream(`${path}/${filename}`);
    writeStream.write(content.join('\r\n'));

    writeStream.end();
  }
}
