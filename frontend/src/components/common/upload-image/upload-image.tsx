import React, { ReactNode, useState } from 'react';
import ImageUploading, { ErrorsType, ImageListType } from 'react-images-uploading';
import { FC } from '../../../common/types/react/fc.type';
import { Modal } from '../common';
import style from './styles.module.scss';
import { getImageUploadError } from '../../../helpers/helpers';

type ResolutionValidation = {
  resolutionType: 'absolute' | 'less' | 'more' | 'ratio';
  resolutionWidth: number;
  resolutionHeight: number;
};

type UploadImageProps = {
  images: never[];
  onUpload: { (imageList: ImageListType, addUpdateIndex: number[] | undefined): void };
  onClose: { (): void };
  modalClassName?: string;
  maxNumber?: number;
  resolutionValidation?: ResolutionValidation;
};

const UploadImage: FC<UploadImageProps> = ({
  images,
  onUpload,
  onClose,
  modalClassName,
  maxNumber = 1,
  resolutionValidation = undefined,
}) => {
  const [error, setError] = useState<string | undefined>();
  const handleError = (errors: ErrorsType, files: ImageListType | undefined): void => {
    const uploadErrorString: string = getImageUploadError(errors);
    setError(uploadErrorString);
    files?.pop();
  };
  const { resolutionType, resolutionWidth, resolutionHeight } = resolutionValidation || {};

  return (
    <Modal contentContainerClassName={modalClassName} isOpen={true} onClose={onClose}>
      <ImageUploading
        multiple
        value={images}
        onChange={onUpload}
        acceptType={['jpg', 'png', 'jpeg', 'jpe', 'jfi', 'jfif', 'jif']}
        maxFileSize={10000000}
        onError={handleError}
        maxNumber={maxNumber}
        resolutionType={resolutionType}
        resolutionHeight={resolutionHeight}
        resolutionWidth={resolutionWidth}
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
