import AvatarEditor from 'react-avatar-editor';
import ReactSlider from 'react-slider';
import style from './styles.module.scss';
import React, { ReactElement, useState } from 'react';
import { AvatarImgValue } from '../../../common/types/image/avatar/avatar-option.type';
import { IconName } from '../../../common/enums/component/icon-name.enum';
import { IconColor } from '../../../common/enums/component/icon-color.enum';
import { Icon } from '../icon';
import { Modal } from '../modal/modal';
import { FC } from '../../../common/types/react/fc.type';
import { useWindowDimensions } from '../../../hooks/hooks';

type imageEditorProps = {
  avatar: AvatarImgValue;
  setAvatar: { (newAvatar: AvatarImgValue): void };
  onClose: { (): void };
  handleSave: { (base64Str: string): void };
};

const ImageEditor: FC<imageEditorProps> = ({ avatar, setAvatar, onClose, handleSave }): ReactElement => {
  const { width } = useWindowDimensions();
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
      handleSave(croppedImg);

      setAvatar({
        ...avatar,
        img: null,
        cropperOpen: false,
        croppedImg: '',
      });
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
          width={250}
          height={250}
          border={width > 350 ? 50 : 35}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={avatar.zoom}
          rotate={avatar.rotate}
        />
        <div className={style['image-editor-control-container']}>
          <Icon name={IconName.ROTATE} color={IconColor.GRAY} width={'20'} height={'20'} onClick={handleRotate} />
          <div className={style['image-editor-slider-container']}>
            <span className={style['zoom-indicator']}>-</span>
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
            <span className={style['zoom-indicator']}>+</span>
          </div>
          <button type={'button'} onClick={onSave}>
            Save
          </button>
        </div>
      </>
    </Modal>
  );
};

export { ImageEditor };
