export const toggleVideoPlay = (video: HTMLVideoElement): void => {
  if (video.paused || video.ended) {
    video.play();
  } else {
    video.pause();
  }
};
