import AvatarEditor from 'react-avatar-editor';
import ReactSlider from 'react-slider';
import style from './styles.module.scss';
import React, { ReactElement, useState } from 'react';
import { AvatarImgValue } from '../../../common/types/image/avatar/avatar-option.type';
import { IconName, IconColor } from '../../../common/enums/components';
import { Icon } from '../icon';
import { FC } from '../../../common/types/types';
import { Modal } from '../modal/modal';

type imageEditorProps = {
  avatar: AvatarImgValue;
  setAvatar: { (newAvatar: AvatarImgValue): void };
  onClose: { (): void };
  handleSave: { (base64Str: string): void };
};
const ImageEditor: FC<imageEditorProps> = ({ avatar, setAvatar, onClose, handleSave }): ReactElement => {
  const [editor, setEditor] = useState<undefined | AvatarEditor>();
  const handleSlider = (value: number): void => {
    setAvatar({
      ...avatar,
      zoom: value,
    });
  };
  const setEditorRef = (ed: AvatarEditor): void => {
    setEditor(ed);
  };
  const onSave = (): void => {
    if (editor) {
      const canvasScaled = editor.getImageScaledToCanvas();
      const croppedImg = canvasScaled.toDataURL();

      setAvatar({
        ...avatar,
        img: null,
        cropperOpen: false,
        croppedImg: croppedImg,
      });
      handleSave(croppedImg);
    }
  };
  const handleRotate = (): void => {
    const { rotate } = avatar;
    setAvatar({
      ...avatar,
      rotate: rotate === 360 ? 0 : rotate + 90,
    });
  };
  return (
    <Modal isOpen={true} onClose={onClose}>
      <>
        <AvatarEditor
          image={
            avatar.img
              ? (avatar.img.dataURL as string)
              : 'https://i.ibb.co/SJBq57m/404-error-page-or-file-not-found-icon-cute-green-vector-20364439.jpg'
          }
          ref={setEditorRef}
          width={95}
          height={95}
          border={200}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={avatar.zoom}
          rotate={avatar.rotate}
        />
        <div className={style['image-editor-control-container']}>
          <Icon name={IconName.ROTATE} color={IconColor.GRAY} width={'20'} height={'20'} onClick={handleRotate} />
          <div className={style['image-editor-slider-container']}>
            <Icon name={IconName.ZOOM_IN} color={IconColor.GRAY} width={'30'} height={'30'} />
            <ReactSlider
              className={style['horizontal-slider']}
              thumbClassName={style['example-thumb']}
              trackClassName={style['example-track']}
              defaultValue={5}
              onChange={handleSlider}
              max={15}
              min={1}
              renderThumb={(props): ReactElement => <div {...props}></div>}
            />
            <Icon name={IconName.ZOOM_IN} color={IconColor.GRAY} width={'30'} height={'30'} />
          </div>
          <button type={'button'} onClick={onClose}>
            Close
          </button>
          <button type={'button'} onClick={onSave}>
            Save
          </button>
        </div>
      </>
    </Modal>
  );
};

export { ImageEditor };
