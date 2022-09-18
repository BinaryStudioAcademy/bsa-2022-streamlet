import { Modal } from '../modal/modal';
import { FC } from 'react';

import styles from './styles.module.scss';

type ModalTexts = {
  headerText: string;
  mainText: string;
  buttonText: string;
};

type RequestModalProps = {
  onSubmit: () => void;
  onClose: () => void;
  isOpen: boolean;
  modalTexts: ModalTexts;
};

const RequestModal: FC<RequestModalProps> = ({ onSubmit, onClose, isOpen, modalTexts }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isNeedHiddenOverflow={true}>
      <div className={styles['content-container']}>
        <div className={styles['content-heading']}>
          <div className={styles['content-header']}>{modalTexts.headerText}</div>
          <div className={styles['content-subheader']}>{modalTexts.mainText}</div>
        </div>
        <div className={styles['button-container']}>
          <button type="button" onClick={onSubmit} className={styles['button']}>
            {modalTexts.buttonText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export { RequestModal };
