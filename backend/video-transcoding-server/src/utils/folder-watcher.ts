import watch from 'node-watch';

export const folderWatcher = (path: string, cb: (eventType: string, filename: string) => void): void => {
  watch(
    path,
    {
      recursive: true,
      filter: /\.m3u8$/,
    },
    (eventType, filename) => {
      cb(eventType, filename);
    },
  );
};
