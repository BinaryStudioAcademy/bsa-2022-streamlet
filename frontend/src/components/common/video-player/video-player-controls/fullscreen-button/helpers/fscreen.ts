import fscreen from 'fscreen';

interface NonStandardPlayer extends HTMLVideoElement {
  webkitExitFullscreen: () => void;
  webkitEnterFullScreen: () => void;
}

export const exitFullScreen = (videoContainer: HTMLVideoElement): void => {
  if (fscreen.fullscreenEnabled) {
    fscreen.exitFullscreen();
  } else if ((videoContainer as NonStandardPlayer).webkitExitFullscreen) {
    (videoContainer as NonStandardPlayer).webkitExitFullscreen();
  }
};

export const enterFullScreen = (videoContainerWrapper: HTMLElement, videoContainer: HTMLVideoElement): void => {
  // it's notable that on iOS safari you can't make div fullscreen,
  // only video player, so you have to go back to default controls.
  // moreover, the fullscreen api is apparently not implemented
  // one simple way of detecting it is to see if fullscreen api is supported.
  // if not, it's most likely iOS
  // #safariIsTheNewIE6
  if (fscreen.fullscreenEnabled) {
    fscreen.requestFullscreen(videoContainerWrapper);
  } else if ((videoContainer as unknown as NonStandardPlayer).webkitEnterFullScreen) {
    // Toggle fullscreen in Safari for iOS
    (videoContainer as NonStandardPlayer).webkitEnterFullScreen();
  }
};
