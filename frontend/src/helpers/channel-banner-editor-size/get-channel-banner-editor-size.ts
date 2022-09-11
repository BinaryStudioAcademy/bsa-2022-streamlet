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
  const width = screenWidth - padding > 1251 ? 1251 : screenWidth - padding;

  const height = width / aspectRatio + controlHeight + 10;
  return {
    width,
    height,
  };
};

export { getChannelBannerEditorSize };
