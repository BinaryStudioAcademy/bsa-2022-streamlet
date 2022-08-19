import watch from 'node-watch';

export const folderWatcher = (path: string, cb: (eventType: string, filename: string) => void): void => {
  watch(
    path,
    {
      recursive: true,
      filter: /playlist-720p30\.m3u8/gm,
    },
    (eventType, filename) => {
      cb(eventType, filename);
    },
  );
};
