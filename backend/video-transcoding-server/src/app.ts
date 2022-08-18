import { WorkerFactory } from './factories';
import path from 'path';
import { createMasterPlaylist } from './utils';
import { FsService } from './services';

const streamFolderName = 'STREAM_NAME';
const staticPath = path.resolve(__dirname, '../playback');
FsService.createFolder({ path: path.resolve(staticPath, streamFolderName) });
createMasterPlaylist(path.resolve(staticPath, streamFolderName));

const process720p30 = WorkerFactory.create({
  input: 'playback/2022-08-18-13-27-22.mp4',
  width: 1280,
  height: 720,
  fps: 30,
});
const process480p30 = WorkerFactory.create({
  input: 'playback/2022-08-18-13-27-22.mp4',
  width: 720,
  height: 480,
  fps: 30,
});
const process360p30 = WorkerFactory.create({
  input: 'playback/2022-08-18-13-27-22.mp4',
  width: 480,
  height: 360,
  fps: 30,
});

process720p30.run();
process480p30.run();
process360p30.run();
