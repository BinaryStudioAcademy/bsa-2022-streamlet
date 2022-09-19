import { Modal } from 'components/common/common';
import { FC, useState } from 'react';
import { VideoPrivacy } from 'shared/build';
import style from './styles.module.scss';
import { allPrivacyMenuOptions } from '../../config';

type PrivacyModalProps = {
  currentPicked: VideoPrivacy;
  onOk: (visibility: VideoPrivacy) => void;
  onCancel: () => void;
  isOpen: boolean;
};

export const PrivacyModal: FC<PrivacyModalProps> = ({ currentPicked, onOk, onCancel, isOpen }) => {
  const [picked, setPicked] = useState<VideoPrivacy>(currentPicked);
  const radioBtnHandler = (option: VideoPrivacy): void => {
    setPicked(option);
  };

  const privacyOptions = allPrivacyMenuOptions;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      contentContainerClassName={style['modal']}
      isNeedCloseButton={false}
      isNeedHiddenOverflow={false}
    >
      <div className={style['content-container']}>
        {privacyOptions.map(({ type, text }) => (
          <div key={type} className={style['option']}>
            <div onClick={(): void => radioBtnHandler(type)} className={style['radio-btn']}>
              {picked === type && <div className={style['picked']} />}
            </div>
            <div className={style['option-name']}>{text}</div>
          </div>
        ))}
      </div>
      <div className={style['button-container']}>
        <button type="button" onClick={onCancel} className={style['button']}>
          Cancel
        </button>
        <button type="button" onClick={(): void => onOk(picked)} className={style['button']}>
          Submit
        </button>
      </div>
    </Modal>
  );
};
