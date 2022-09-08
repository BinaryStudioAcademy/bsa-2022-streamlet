import React, { useState, useCallback, ReactElement } from 'react';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
import styleControls from '../image-editor/styles.module.scss';
import ReactSlider from 'react-slider';
import styles from './styles.module.scss';
import { Modal } from '../common';
import { useWindowDimensions } from '../../../hooks/hooks';
import { getChannelBannerEditorSize, getCroppedImg } from '../../../helpers/helpers';
import { FC } from '../../../common/types/react/fc.type';

type props = {
  banner: string;
  setBanner: { (newBannerBase64: string): void };
  handleSave: { (base64Str: string): void };
  handleClose: { (): void };
};

const ChannelBannerEditor: FC<props> = ({ banner, setBanner, handleClose, handleSave }): ReactElement => {
  const { width } = useWindowDimensions();
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const { width: editorWidth, height: editorHeight } = getChannelBannerEditorSize({
    screenWidth: width,
    aspectRatio: 1251 / 401,
    padding: 5,
    controlHeight: 50,
  });
  const handleSlider = (zoom: number): void => {
    setZoom(zoom);
  };

  const onSave = useCallback(async () => {
    try {
      if (croppedAreaPixels && croppedAreaPixels) {
        const croppedImage = await getCroppedImg(banner, croppedAreaPixels);
        setBanner(croppedImage as string);
        handleSave(croppedImage as string);
      }
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, banner, setBanner, handleSave]);

  const handleZoomPlusButtonClick = (): void => {
    if (zoom + 1 <= 15) {
      setZoom(zoom + 1);
    }
  };

  const handleZoomMinusButtonClick = (): void => {
    if (zoom >= 2) {
      setZoom(zoom - 1);
    }
  };

  return (
    <Modal isOpen={true} onClose={handleClose} isNeedCloseButton={false}>
      <div className={styles['banner-editor-container']} style={{ width: editorWidth, height: editorHeight }}>
        <div className={styles['crop-container']}>
          <Cropper
            image={banner}
            crop={crop}
            zoom={zoom}
            showGrid={false}
            aspect={1252 / 401}
            onCropChange={setCrop}
            maxZoom={15}
            minZoom={1}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className={styles['controls']}>
          <div className={styles['image-editor-slider-container']}>
            <span className={styles['zoom-indicator']} onClick={handleZoomMinusButtonClick}>
              -
            </span>
            {width > 500 && (
              <ReactSlider
                className={styleControls['horizontal-slider']}
                thumbClassName={styleControls['example-thumb']}
                trackClassName={styleControls['example-track']}
                defaultValue={5}
                onChange={handleSlider}
                max={15}
                min={1}
                value={zoom}
                renderThumb={(props): ReactElement => <div {...props}></div>}
              />
            )}
            <span className={styles['zoom-indicator']} onClick={handleZoomPlusButtonClick}>
              +
            </span>
          </div>
          <div className={styles['button-container']}>
            <button type={'button'} onClick={handleClose}>
              Cancel
            </button>
            <button type={'button'} onClick={onSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export { ChannelBannerEditor };
