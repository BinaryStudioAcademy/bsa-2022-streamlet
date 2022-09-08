import { Size } from 'react-easy-crop';
import { createImage } from './create-image';

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Size & { x: number; y: number },
  flip = { horizontal: false, vertical: false },
): Promise<string> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('ooops something went wrong');
  }

  const { width: bBoxWidth, height: bBoxHeight } = image;

  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(data, 0, 0);

  const dataUrl = canvas.toDataURL('image/jpeg');
  dataUrl.replace(/^data:image\/(png|jpg);base64,/, '');

  return dataUrl;
};

export { createImage, getCroppedImg };
