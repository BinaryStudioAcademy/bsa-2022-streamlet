import Hls from 'hls.js';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { VideoPlayerControls } from './video-player-controls/video-player-controls';

import styles from './styles.module.scss';
import { toggleVideoPlay } from './helpers/toggle-video-play';
import clsx from 'clsx';
import { PlayPauseCenterEffect } from './play-pause-center-effect/play-pause-center-effect';
import fscreen from 'fscreen';
import { ENV } from 'common/enums/enums';
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
  className?: string;
  showControls?: boolean;
  maxControlsShadowHeight?: string;
  mute?: boolean;
  // fires when user clicks play (and video was paused),
  // or when autoplay is used
  onStartPlay?: () => void;
};

const FULLSCREEN_INACTIVE_TIME_MS = 2000;

const VideoPlayer: FC<VideoPlayerProps> = ({
  videoAttributes,
  url,
  sizingProps = {},
  isLive = false,
  className,
  showControls = true,
  onStartPlay,
  mute = false,
  maxControlsShadowHeight = '100vh',
}) => {
  const videoContainerRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerWrapperRef = useRef<HTMLElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [areRefsNull, setAreRefsNull] = useState({
    videoContainer: true,
    videoContainerWrapper: true,
    hls: true,
  });
  const [isFullscreen, setIsFullscreen] = useState(
    fscreen.fullscreenElement !== null && fscreen.fullscreenElement === videoContainerWrapperRef.current,
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
        fscreen.fullscreenElement !== null && fscreen.fullscreenElement === videoContainerWrapperRef.current,
      );
    };

    fscreen.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      fscreen.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (!videoContainerRef.current || hlsRef.current) {
      return;
    }
    if (Hls.isSupported()) {
      const hls = new Hls({
        startLevel: -1,
        // according to docs: "value too low (inferior to ~3 segment durations) is likely to cause playback stalls"
        // if this is a problem, value may be returned to 3, which will make the video start 6 seconds before live point
        liveSyncDuration: 0,
        liveMaxLatencyDuration: 0.5,
        // ideally, there should be some modifications in the playlist file
        // when the video turns offline, that would differentiate it from live video
        // and let the player start from start automatically
        // but, even if it's not the case, the player may stupidly look at isLive and
        // modify start position
        startPosition: isLive ? -1 : 0,
      });

      hls.attachMedia(videoContainerRef.current);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(new URL(url, ENV.VIDEO_FALLBACK_BASE_URL).toString());
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
  }, [areRefsNull.videoContainer, isLive, url]);

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
      className={clsx({ [styles['fullscreen']]: isFullscreen }, styles['video-container-wrapper'], className)}
      style={
        {
          height: sizingProps.height,
          width: sizingProps.width,
          aspectRatio: sizingProps.aspectRatio,
          '--max-controls-shadow-height': maxControlsShadowHeight,
        } as React.CSSProperties
      }
      data-paused="true"
    >
      <video
        autoPlay
        muted={mute}
        playsInline
        ref={videoContainerCallbackRef}
        {...videoAttributes}
        className={styles['video-container']}
        onClick={(e): void => {
          toggleVideoPlay(e.currentTarget);
        }}
        onDoubleClick={(): void => {
          if (fscreen.fullscreenElement !== null) {
            fscreen.exitFullscreen();
          } else if (videoContainerWrapperRef.current) {
            fscreen.requestFullscreen(videoContainerWrapperRef.current);
          }
        }}
        onPlay={onStartPlay}
      >
        <p>Your browser doesn't support playing video. Please upgrade to a new one.</p>
      </video>
      <div></div>
      {videoContainerRef.current && videoContainerWrapperRef.current && hlsRef.current && showControls && (
        <>
          <PlayPauseCenterEffect videoContainer={videoContainerRef.current} className={styles['playpause-effect']} />
          <VideoPlayerControls
            hlsClient={hlsRef.current}
            isLive={isLive}
            isFullscreen={isFullscreen}
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
