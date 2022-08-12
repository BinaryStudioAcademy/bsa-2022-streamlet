import { Modal } from '../modal/modal';
import { FC } from '../../../common/types/react/fc.type';
import style from './styles.module.scss';

type ConfirmationModalProps = {
  confirmationText: string;
  onOk: () => void;
  onCancel: () => void;
  isOpen: boolean;
};

const ConfirmationModal: FC<ConfirmationModalProps> = ({ confirmationText, onOk, onCancel, isOpen }) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className={style['content-container']}>
        <span className={style['confirmation-text']}>{confirmationText}</span>
        <div className={style['button-container']}>
          <button type="button" onClick={onCancel} className={style['button']}>
            Cancel
          </button>
          <button type="button" onClick={onOk} className={style['button']}>
            Ok
          </button>
        </div>
      </div>
    </Modal>
  );
};

export { ConfirmationModal };
