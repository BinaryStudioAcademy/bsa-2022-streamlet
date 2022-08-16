import Hls from 'hls.js';
import React, { FC, useEffect, useState } from 'react';
import { VideoPlayerControls } from './video-player-controls/video-player-controls';

type VideoPlayerProps = {
  videoAttributes: {
    height?: number | string;
    width?: number | string;
    poster?: string;
  };
  url: string;
};

const VideoPlayer: FC<VideoPlayerProps> = ({ videoAttributes, url }) => {
  const [videoContainer, setVideoContainer] = useState<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoContainer) {
      return;
    }
    if (Hls.isSupported()) {
      const hls = new Hls({ debug: process.env.NODE_ENV === 'development' });

      hls.loadSource(url);
      hls.attachMedia(videoContainer);

      hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });

      return (): void => hls.destroy();
    }
    if (videoContainer.canPlayType('application/vnd.apple.mpegurl')) {
      videoContainer.src = url;
    }
  }, [videoContainer]);

  return (
    <figure>
      <video ref={(element): void => setVideoContainer(element)} {...videoAttributes}>
        <p>Your browser doesn't support playing video. Please upgrade to a new one.</p>
      </video>
      {videoContainer && <VideoPlayerControls videoContainer={videoContainer} />}
    </figure>
  );
};
export { VideoPlayer };
