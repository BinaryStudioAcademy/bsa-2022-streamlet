import React, { ReactNode, useState } from 'react';
import ImageUploading, { ErrorsType, ImageListType } from 'react-images-uploading';
import { FC } from '../../../common/types/react/fc.type';
import { Modal } from '../common';
import style from './styles.module.scss';
import { getImageUploadError } from '../../../helpers/helpers';

type UploadImageProps = {
  images: never[];
  maxNumber?: number;
  onUpload: { (imageList: ImageListType, addUpdateIndex: number[] | undefined): void };
  onClose: { (): void };
};

const UploadImage: FC<UploadImageProps> = ({ images, maxNumber = 1, onUpload, onClose }) => {
  const [error, setError] = useState<string | undefined>();
  const handleError = (errors: ErrorsType, files: ImageListType | undefined): void => {
    const uploadErrorString: string = getImageUploadError(errors);
    setError(uploadErrorString);
    files?.pop();
  };
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ImageUploading
        multiple
        value={images}
        onChange={onUpload}
        maxNumber={maxNumber}
        acceptType={['jpg', 'png']}
        onError={handleError}
      >
        {({ onImageUpload, isDragging, dragProps }): ReactNode => (
          <div className={style['upload-image-wrapper']}>
            <div style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps}>
              <p>Click or Drop here</p>
            </div>
            {error ? (
              <div className={'error-box'}>
                <p className={'error-message'}>{error}</p>
              </div>
            ) : null}
          </div>
        )}
      </ImageUploading>
    </Modal>
  );
};

export { UploadImage };
