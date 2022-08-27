import Hls from 'hls.js';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { VideoPlayerControls } from './video-player-controls/video-player-controls';

import styles from './styles.module.scss';
import { toggleVideoPlay } from './helpers/toggle-video-play';
import clsx from 'clsx';
import { PlayPauseCenterEffect } from './play-pause-center-effect/play-pause-center-effect';

type VideoPlayerProps = {
  sizingProps?: {
    height?: number | string;
    width?: number | string;
    aspectRatio?: string;
  };
  videoAttributes?: {
    poster?: string;
  };
  url: string;
  isLive?: boolean;
};

const FULLSCREEN_INACTIVE_TIME_MS = 2000;

const VideoPlayer: FC<VideoPlayerProps> = ({ videoAttributes, url, sizingProps = {}, isLive = false }) => {
  const videoContainerRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerWrapperRef = useRef<HTMLElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [areRefsNull, setAreRefsNull] = useState({
    videoContainer: true,
    videoContainerWrapper: true,
    hls: true,
  });
  const [isFullscreen, setIsFullscreen] = useState(
    document.fullscreenElement !== null && document.fullscreenElement === videoContainerWrapperRef.current,
  );

  useEffect(() => {
    if (isFullscreen) {
      let timeout: NodeJS.Timeout;
      const handleMouseMove = (): void => {
        clearTimeout(timeout);
        videoContainerWrapperRef.current &&
          videoContainerWrapperRef.current.setAttribute('data-keep-open-fullscreen', 'true');
        timeout = setTimeout(function () {
          videoContainerWrapperRef.current &&
            videoContainerWrapperRef.current.setAttribute('data-keep-open-fullscreen', 'false');
        }, FULLSCREEN_INACTIVE_TIME_MS);
      };
      document.addEventListener('mousemove', handleMouseMove);
      return (): void => {
        clearTimeout(timeout);
        document.removeEventListener('mousemove', handleMouseMove);
        videoContainerWrapperRef.current &&
          videoContainerWrapperRef.current.removeAttribute('data-keep-open-fullscreen');
      };
    }
  }, [isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = (): void => {
      setIsFullscreen(
        document.fullscreenElement !== null && document.fullscreenElement === videoContainerWrapperRef.current,
      );
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (!videoContainerRef.current || hlsRef.current) {
      return;
    }
    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.attachMedia(videoContainerRef.current);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(url);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          hlsRef.current = hls;
          setAreRefsNull((prev) => ({
            ...prev,
            hls: false,
          }));
        });
      });

      hls.on(Hls.Events.ERROR, function (_, data) {
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

      return (): void => {
        hls.destroy();
        hlsRef.current = null;
        setAreRefsNull((prev) => ({
          ...prev,
          hls: true,
        }));
      };
    }
  }, [areRefsNull.videoContainer, url]);

  const videoContainerWrapperCallbackRef = useCallback((element: HTMLDivElement | null): void => {
    videoContainerWrapperRef.current = element;
    setAreRefsNull((prev) => ({
      ...prev,
      videoContainerWrapper: element === null,
    }));
  }, []);

  const videoContainerCallbackRef = useCallback((element: HTMLVideoElement | null): void => {
    videoContainerRef.current = element;
    setAreRefsNull((prev) => ({
      ...prev,
      videoContainer: element === null,
    }));
  }, []);

  return (
    <div
      ref={videoContainerWrapperCallbackRef}
      className={clsx({ [styles['fullscreen']]: isFullscreen }, styles['video-container-wrapper'])}
      style={{ height: sizingProps.height, width: sizingProps.width, aspectRatio: sizingProps.aspectRatio }}
      data-paused="true"
    >
      <video
        ref={videoContainerCallbackRef}
        {...videoAttributes}
        className={styles['video-container']}
        onClick={(e): void => {
          toggleVideoPlay(e.currentTarget);
        }}
        onDoubleClick={(): void => {
          if (document.fullscreenElement !== null) {
            document.exitFullscreen();
          } else if (videoContainerWrapperRef.current) {
            videoContainerWrapperRef.current.requestFullscreen();
          }
        }}
      >
        <p>Your browser doesn't support playing video. Please upgrade to a new one.</p>
      </video>
      <div></div>
      {videoContainerRef.current && videoContainerWrapperRef.current && hlsRef.current && (
        <>
          <PlayPauseCenterEffect videoContainer={videoContainerRef.current} className={styles['playpause-effect']} />
          <VideoPlayerControls
            hlsClient={hlsRef.current}
            isLive={isLive}
            videoContainer={videoContainerRef.current}
            videoContainerWrapper={videoContainerWrapperRef.current}
            className={styles['video-elements']}
          />
        </>
      )}
    </div>
  );
};
export { VideoPlayer };
