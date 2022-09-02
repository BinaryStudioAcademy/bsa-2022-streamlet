import React, { ReactNode, useState } from 'react';
import ImageUploading, { ErrorsType, ImageListType } from 'react-images-uploading';
import { FC } from '../../../common/types/react/fc.type';
import { Modal } from '../common';
import style from './styles.module.scss';
import { getImageUploadError } from '../../../helpers/helpers';

type UploadImageProps = {
  images: never[];
  onUpload: { (imageList: ImageListType, addUpdateIndex: number[] | undefined): void };
  onClose: { (): void };
};

const UploadImage: FC<UploadImageProps> = ({ images, onUpload, onClose }) => {
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
        acceptType={['jpg', 'png', 'jpeg', 'jpe', 'jfi', 'jfif', 'jif']}
        maxFileSize={10000000}
        onError={handleError}
      >
        {({ onImageUpload, isDragging, dragProps }): ReactNode => (
          <div className={style['upload-image-wrapper']}>
            <div
              style={isDragging ? { color: 'red' } : undefined}
              className={style['upload-image-field']}
              onClick={onImageUpload}
              {...dragProps}
            >
              <label className={style['drag-an-drop-text']}>
                <input className={style['image-input']} accept="*" />
              </label>
              Click or Drop here
              {error ? <p className={style['error-message']}>{error}</p> : null}
            </div>
          </div>
        )}
      </ImageUploading>
    </Modal>
  );
};

export { UploadImage };
