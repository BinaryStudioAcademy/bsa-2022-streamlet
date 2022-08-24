import { ImageType } from 'react-images-uploading';

type AvatarImgValue = {
  cropperOpen: boolean;
  img: null | ImageType;
  zoom: number;
  croppedImg: string;
  rotate: number;
};

export { type AvatarImgValue };
