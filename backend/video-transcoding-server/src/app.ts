import { WorkerFactory } from './factories';

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
