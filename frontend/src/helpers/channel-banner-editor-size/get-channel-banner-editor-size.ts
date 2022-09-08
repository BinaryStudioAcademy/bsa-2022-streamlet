import { Size } from 'react-easy-crop';

type GetChannelBannerEditorSize = {
  aspectRatio: number;
  screenWidth: number;
  controlHeight: number;
  padding: number;
};

const getChannelBannerEditorSize = ({
  aspectRatio,
  screenWidth,
  padding,
  controlHeight,
}: GetChannelBannerEditorSize): Size => {
  let width = screenWidth - padding;

  if (width > 1251) {
    width = 1251;
  }

  const height = width / aspectRatio + controlHeight + 10;
  return {
    width,
    height,
  };
};
export { getChannelBannerEditorSize };
