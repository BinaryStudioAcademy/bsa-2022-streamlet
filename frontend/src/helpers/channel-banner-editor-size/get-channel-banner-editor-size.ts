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
  const width = screenWidth - padding;
  const height = width / aspectRatio + controlHeight;
  return {
    width,
    height,
  };
};
export { getChannelBannerEditorSize };
